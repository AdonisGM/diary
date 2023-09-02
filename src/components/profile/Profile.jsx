import {Avatar, Card, CardBody, Divider} from "@nextui-org/react";
import {IconLockSquareRounded, IconWorld} from "@tabler/icons-react";
import CreatePost from "../createPost/CreatePost.jsx";
import {Fragment, useEffect, useState} from "react";
import GatewayApi from "../../apis/GatewayApi.js";
import {Decrypt} from "../../crypto/encryptAndDecrypt.js";
import ListPost from "./listPost/ListPost.jsx";

const Profile = () => {
  const [listPosts, setListPosts] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    getAllPost().then(r => {});
  }, [])

  const getAllPost = async () => {
    const res = await GatewayApi('pkg_diary.get_all', {
      username: username,
      start: 0,
      to: 100,
    })

    const arr = res.data.map((item) => {
      return item;
    })

    setListPosts(arr)
  }

  const handleClose = () => {
    getAllPost().then(r => {});
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
                <h1 className={'text-md font-bold mt-3'}>Nguyễn Mạnh Tùng</h1>
                <p className={'text-default-500 text-sm mb-3'}>@nmtung</p>
              </div>
              <Divider/>
              <table className={'w-full'}>
                <tbody>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Lượt ghé thăm</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>0</td>
                </tr>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Theo dõi</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>0</td>
                </tr>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Người theo dõi</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>0</td>
                </tr>
                <tr>
                  <td className={'text-default-500 text-sm pt-1'}>Bài viết</td>
                  <td className={'text-default-500 text-sm pt-1 text-right'}>0</td>
                </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        <div className={'w-2/3'}>
          {/* Posts */}
          <CreatePost onClose={handleClose}/>
          {listPosts.map((item) => {
            return <ListPost key={item.PK_DIARY_POST} post={item}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile