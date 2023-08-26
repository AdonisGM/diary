import {Avatar, Card, CardBody, Divider} from "@nextui-org/react";
import {
  IconLockSquareRounded,
  IconSquareRoundedPlusFilled,
  IconUsers,
  IconWorld
} from "@tabler/icons-react";

const Profile = () => {
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
          {/* Create */}
          <div
            className={'mt-5 flex flex-col items-center justify-center p-5 rounded-xl border-dashed border-default-300 border-2 cursor-pointer text-default-500 text-sm '}
          >
            Bạn ổn không? Kể cho mình nghe với, mình sẽ giữ bí mật và luôn ở đây với bạn. Nhấn vào mình để bắt đầu viết nhé!
          </div>

          {/* Posts */}
          <Card
            className={'mt-5'}
          >
            <CardBody
              className={'py-3'}
            >
              <div className={'flex items-center gap-1 text-green-500'}>
                <IconWorld size={16} stroke={2} color={'#9cd37d'}/>
                <p className={'text-xs italic'}>
                  Công khai
                </p>
                <p className={'text-xs italic'}>
                  • 1 giờ trước
                </p>
              </div>
              <p className={'text-default-700 font-bold text-md mt-2'}>
                Nỗi buồn không thể nói ra
              </p>
              <p
                className={'text-default-500 text-sm mt-2'}
              >
                Hôm nay mình buồn quá, không biết nói với ai cả. Mình cảm thấy mình không có giá trị gì cả, mình không có tài năng, mình không có gì cả. Mình chỉ là một người bình thường, không có gì đặc biệt.
              </p>
              <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
                <p className={'text-default-300 text-xs italic'}>
                  ID: AGM-0000000000
                </p>
                <p className={'text-default-300 text-xs italic'}>
                  Protection key: None
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            className={'mt-5'}
          >
            <CardBody
              className={'py-3'}
            >
              <div className={'flex items-center gap-1 text-red-500'}>
                <IconLockSquareRounded size={16} stroke={2} color={'#d05f5f'}/>
                <p className={'text-xs italic'}>
                  Riêng tư
                </p>
                <p className={'text-xs italic'}>
                  • 1 giờ trước
                </p>
              </div>
              <p className={'text-default-700 font-bold text-md mt-2'}>
                Nhớ ai đó
              </p>
              <p
                className={'text-default-500 text-sm mt-2'}
              >
                Khi nhớ ai đó, mình sẽ viết ra những gì mình muốn nói với họ. Nhưng mà mình không dám nói ra, mình sợ họ sẽ không thích mình nữa. Mình sợ họ sẽ không quan tâm mình nữa. Mình sợ họ sẽ không thương mình nữa. Mình sợ họ sẽ không yêu mình nữa.
              </p>
              <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
                <p className={'text-default-300 text-xs italic'}>
                  ID: AGM-0000000000
                </p>
                <p className={'text-default-300 text-xs italic'}>
                  Protection key: 3D 2Y 5A 6B 7C 8D 9E 0F 4G 1H 51 52
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            className={'mt-5'}
          >
            <CardBody
              className={'py-3'}
            >
              <div className={'flex items-center gap-1 text-yellow-500'}>
                <IconUsers size={16} stroke={2} color={'#d3bf7d'}/>
                <p className={'text-xs italic'}>
                  Bạn bè
                </p>
                <p className={'text-xs italic'}>
                  • 1 giờ trước
                </p>
              </div>
              <p className={'text-default-700 font-bold text-md mt-2'}>
                Lorem ipsum dolor sit
              </p>
              <p
                className={'text-default-500 text-sm mt-2'}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores atque autem beatae
                consequatur cumque cupiditate delectus doloremque doloribus ducimus ea earum eius eligendi error
                excepturi exercitationem explicabo facere facilis fugiat fugit hic illum impedit in incidunt ipsa
                ipsum iure laboriosam laborum libero magnam maiores maxime minima minus molestiae mollitia natus
                necessitatibus nemo neque nihil nisi nobis nostrum nulla numquam obcaecati officia officiis omnis
              </p>
              <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
                <p className={'text-default-300 text-xs italic'}>
                  ID: AGM-0000000002
                </p>
                <p className={'text-default-300 text-xs italic'}>
                  Protection key: None
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            className={'mt-5'}
          >
            <CardBody
              className={'py-3'}
            >
              <div className={'flex items-center gap-1 text-yellow-500'}>
                <IconUsers size={16} stroke={2} color={'#d3bf7d'}/>
                <p className={'text-xs italic'}>
                  Bạn bè
                </p>
                <p className={'text-xs italic'}>
                  • 1 giờ trước
                </p>
              </div>
              <p className={'text-default-700 font-bold text-md mt-2'}>
                Lorem ipsum dolor sit
              </p>
              <p
                className={'text-default-500 text-sm mt-2'}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores atque autem beatae
                consequatur cumque cupiditate delectus doloremque doloribus ducimus ea earum eius eligendi error
                excepturi exercitationem explicabo facere facilis fugiat fugit hic illum impedit in incidunt ipsa
                ipsum iure laboriosam laborum libero magnam maiores maxime minima minus molestiae mollitia natus
                necessitatibus nemo neque nihil nisi nobis nostrum nulla numquam obcaecati officia officiis omnis
              </p>
              <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
                <p className={'text-default-300 text-xs italic'}>
                  ID: AGM-0000000002
                </p>
                <p className={'text-default-300 text-xs italic'}>
                  Protection key: None
                </p>
              </div>
            </CardBody>
          </Card>
          <Card
            className={'mt-5'}
          >
            <CardBody
              className={'py-3'}
            >
              <div className={'flex items-center gap-1 text-yellow-500'}>
                <IconUsers size={16} stroke={2} color={'#d3bf7d'}/>
                <p className={'text-xs italic'}>
                  Bạn bè
                </p>
                <p className={'text-xs italic'}>
                  • 1 giờ trước
                </p>
              </div>
              <p className={'text-default-700 font-bold text-md mt-2'}>
                Lorem ipsum dolor sit
              </p>
              <p
                className={'text-default-500 text-sm mt-2'}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores atque autem beatae
                consequatur cumque cupiditate delectus doloremque doloribus ducimus ea earum eius eligendi error
                excepturi exercitationem explicabo facere facilis fugiat fugit hic illum impedit in incidunt ipsa
                ipsum iure laboriosam laborum libero magnam maiores maxime minima minus molestiae mollitia natus
                necessitatibus nemo neque nihil nisi nobis nostrum nulla numquam obcaecati officia officiis omnis
              </p>
              <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
                <p className={'text-default-300 text-xs italic'}>
                  ID: AGM-0000000002
                </p>
                <p className={'text-default-300 text-xs italic'}>
                  Protection key: None
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile