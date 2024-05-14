import {Avatar, Button, Card, CardBody, Divider, Tooltip} from "@nextui-org/react";
import {IconDiscountCheckFilled, IconSettingsFilled, IconCircleKeyFilled, IconArchiveFilled} from "@tabler/icons-react";
import CreatePost from "../createPost/CreatePost.jsx";
import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi";
import PostItem from "../../pages/postPage/PostItem.jsx";
import {useParams, useNavigate} from "react-router-dom";

const Profile = () => {
  const [listPosts, setListPosts] = useState([]);
  const [infoUser, setInfoUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    getAllPost();
    getInfoUser();
  }, [])

  const getInfoUser = () => {
    callApi('pkg_diary.get_info', {
      username: username
    }, (data) => {
      setInfoUser(data[0]);
    })
  }

  const getAllPost = () => {
    let listFingerprints = [];
    if (localStorage.getItem('username') === username) {
      listFingerprints = JSON.parse(localStorage.getItem(`key-${username}`)).map((e) => {
        return e.fingerprint
      }).join('|')
    }

    callApi('pkg_diary.get_all', {
      username: username,
      listFingerprints: listFingerprints,
      start: 0,
      to: 100,
    }, (data) => {
      const arr = data.map((item) => {
        return item;
      })
  
      setListPosts(arr)
    })
  }

  const handleClose = () => {
    getAllPost().then(r => {});
  }

  const handleArchive = (pk_diary_post) => {
    setListPosts(listPosts.filter((item) => {
      return item.PK_DIARY_POST !== pk_diary_post
    }))
  }

  return (
    <div className={'flex flex-col items-center'}>
      <div className={'w-[900px] flex flex-row gap-5'}>
        <div className={'w-1/3 sticky top-0 self-start'}>
          <Card
            className={'mt-5'}
          >
            <CardBody className={'py-3 flex flex-col items-center justify-center'}>
              <h1 className={'text-default-500 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'}>Diary</h1>
            </CardBody>
          </Card>
          <Card
            className={'mt-5'}
          >
            <CardBody>
              <div className="flex items-center justify-center">
                <Avatar
                  classNames={{
                    base: "bg-gradient-to-br from-purple-200 to-pink-300 w-20 h-20",
                    icon: "text-black/60",
                  }}
                  size="xl"
                />
              </div>
              <div className={'flex flex-col items-center justify-center'}>
                <h1 className={'text-md font-bold mt-3 flex items-center gap-1'}>{infoUser.C_FULLNAME} {infoUser.C_IS_ADMIN === 1 && <Tooltip showArrow={true} content="Administrator của hệ thống"><IconDiscountCheckFilled style={{color: 'lightblue'}} size={'20'}/></Tooltip>} </h1>
                <p className={'text-default-500 text-sm mb-3'}>@{infoUser.C_USERNAME}</p>
              </div>
              <Divider/>
              <table className={'w-full'}>
                <tbody>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Lượt ghé thăm</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>{infoUser.C_NUMBER_VIEW}</td>
                </tr>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Bài viết</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>{infoUser.C_NUMBER_POST}</td>
                </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
          <div className="mt-5 grid grid-cols-5 gap-1">
            <div className={'flex flex-col items-center justify-center'}>
              <Button color="secondary" isIconOnly><IconCircleKeyFilled/></Button>
            </div>
            <div className={'flex flex-col items-center justify-center'}>
              <Button color="secondary" isIconOnly>
                <IconSettingsFilled onClick={() => {
                  window.location.href = import.meta.env.VITE_SSO_URL + '/settings'
                }}/>
              </Button>
            </div>
            <div className={'flex flex-col items-center justify-center'}>
              <Button color="secondary" isIconOnly>
                <IconArchiveFilled/>
              </Button>
            </div>
          </div>
        </div>
        <div className={'w-2/3'}>
          {/* Posts */}
          <CreatePost onClose={handleClose}/>
          {listPosts.map((item) => {
            return <PostItem key={item.PK_DIARY_POST} post={item} onArchive={handleArchive}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile
