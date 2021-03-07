import Taro, {
  Component,
  Config,
  useRef,
  useEffect,
  useState,
  usePullDownRefresh,
  useReachBottom,
  usePageScroll,
  useShareAppMessage
} from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";

// import {gotoPostDetail} from '../../router/routes'
import PostCard from "@/components/post-card/typed-card-content";
import Modal from '@/components/modal'
import ShareCanvas from '@/components/share/share-canvas'

import ImagePost from '@/models/image-post'
import VideoPost from '@/models/video-post'

import { fetchPostList } from "@/actions/post";
import { PostType, createPost } from "@/models/post";

import "./index.less";


const SCROLL_TIME = 200
export default function Index() {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false)//模态框
  const [shareTitle, setShareTitle] = useState<string>('')
  const [imageUrls, setImageUrls] = useState<Array<string>>([])//待生成canvas图片
  const [shareImage, setShareImage] = useState('')//分享图片
  const scrollTimeout = useRef<any | null>(null) 
  const postCardsRef = useRef<any[]>([])
  const showingVideoCardRef = useRef<any | null>(null)


  const fetchData = async (flag?: boolean) => {
    const res = await fetchPostList(1)
    const { data } = res;
    // console.log(data)
    const newPosts = data.data.map((postData) => {
      return createPost(postData);
    });
    // 更新数据
    if(flag){
      setPostList([])
    }
    setPostList(postList.concat(newPosts));
  };

  // 下拉刷新
  usePullDownRefresh(async () => {
    await fetchData(true);
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 500)
  });

  useEffect(() => {
    fetchData();
  }, []);

  // 自动播放视频
  const checkWillShowVideoPost = () => {
    const query = Taro.createSelectorQuery()
    query.selectAll('.video-post')
      .boundingClientRect()
      .exec((res) => {
        const {windowHeight} = Taro.getSystemInfoSync()
        const current = res[0].find((rect) => {
          let {top, bottom, height} = rect

          return (
            (bottom > height /2) && (windowHeight - top > height / 2)
          )
        })

        if(current){
          // console.log(current)
          const postId = current.dataset.postId
          const willShowPostCard = postCardsRef.current[postId]
          if(willShowPostCard){
            if(showingVideoCardRef.current && showingVideoCardRef.current.postId === postId){
              showingVideoCardRef.current.resume()
            }else{
              willShowPostCard.play();
              if(showingVideoCardRef.current){
                showingVideoCardRef.current.stop()
              }
              showingVideoCardRef.current = willShowPostCard
            }
            
          }
        }
      })
  }

  // 滚动监听
  usePageScroll(() => {
    // console.log(e)
    if(showingVideoCardRef.current){
      showingVideoCardRef.current.pause()
    }
    // 防抖
    if(scrollTimeout.current) clearTimeout(scrollTimeout.current)
    
    scrollTimeout.current = setTimeout(() => {
      //滚动结束
      checkWillShowVideoPost()
    }, SCROLL_TIME)
  })

  // 滚动到底部
  useReachBottom(() => {
    fetchData()
  })

  // 点击分享
  const handleShare = (post) => {
    setShowModal(true)
    const {title} = post
    setShareTitle(title)
    // 视频
    if(VideoPost.isVideoPost(post)){
      const {poster} = post
      setImageUrls([poster])
    }
    // 图片
    else if(ImagePost.isImagePost(post)){
      const {images} = post
      setImageUrls(images)
    }
  }

  // 获取canvas图片
  const fetchShareImage = (image) => {
    setShareImage(image)
  }

  // 微信分享
  useShareAppMessage((res) => {
    let shareInfo: any = {}
    if(res.from === 'button') {
      console.log(shareImage)
      shareInfo = {
        title: shareTitle,
        imageUrl: shareImage
      }
    }
    return shareInfo
  })
  
  const renderShareHeader = () => {
    return (
      <View className="share-header">分享图片</View>
    )
  }
  const renderShareContent = () => {
    return (
      <View className="share-content">
        {
          showModal && (
            <ShareCanvas 
              imageUrls={imageUrls}
              onShareImage={(image) => fetchShareImage(image)}
            />
          )
        }
      </View>
    )
  }
  const renderShareFooter = () => {
    return (
      <View className="share-footer">
        <Button
          className="share-btn"
          openType="share"

        >分享给朋友</Button>
      </View>
    )
  }

  return (
    <View className="index">
      {postList.map((post, idx) => {
        const { id } = post;
        const isVideoPost = VideoPost.isVideoPost(post)
        return (
          <View 
            key={id + '-' + idx}
            className={isVideoPost ? 'video-post' : ''}
            data-post-id={id}>
            <PostCard 
              ref={(postCard) => {postCardsRef.current[id] = postCard}}
              key={`post-${id}`} 
              post={post}
              onShare={handleShare} />
          </View>
        );
      })}
      {/* 分享图片 */}
      <Modal 
        renderHeader={renderShareHeader()}
        renderContent={renderShareContent()}
        renderFooter={renderShareFooter()}
        mdShow={showModal}
        onCloseModal={() => setShowModal(false)} />
    </View>
  );
}

Index.config = {
  navigationBarTitleText: "首页",
  enablePullDownRefresh: true,
  onReachBottomDistance: 80
} as Config;
