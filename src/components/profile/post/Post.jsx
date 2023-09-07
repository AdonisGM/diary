import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem
} from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import {
  IconLockSquareRounded,
  IconWorld,
  IconDotsCircleHorizontal,
  IconCircleKeyFilled,
  IconArchiveFilled
} from '@tabler/icons-react';
import { Decrypt } from '../../../crypto/encryptAndDecrypt.js';
import { convertTimeToTextAgo } from '../../../common/common.js';

const Post = (props) => {
  const [post, setPost] = useState({});
  const [isShowContent, setIsShowContent] = useState(false);
  const disableKey = props.post.C_STATUS === 'PRIVATE' && isShowContent !== false ? [] : ['lock'];

  useEffect(() => {
    decryptPost().then((r) => {});
  }, []);

  const decryptPost = async () => {
    if (props.post.C_STATUS === 'PRIVATE') {
      const objDecrypt = await Decrypt(
        props.post.C_CONTENT,
        props.post.C_COUNTER,
        props.post.C_FINGERPRINT
      );
      setPost({
        ...props.post,
        C_CONTENT: objDecrypt,
      });
    }

    if (props.post.C_STATUS === 'PUBLIC') {
      setPost(props.post);
    }
  };

  const handleSelectOption = (option) => {
    if (option === 'lock' && post.C_STATUS === 'PRIVATE' && isShowContent) {
      setIsShowContent(false);
    }
  };

  return (
    <Card key={post.PK_DIARY_POST} className={'mt-5'}>
      <CardHeader>
        <div className="flex flex-row justify-stretch gap-3 items-stretch w-full">
          <div className="border-solid border-1 min-h-[50px] min-w-[50px] max-h-[50px] flex items-center justify-center flex-col rounded-md drop-shadow-sm">
            <p className={'text-xl font-bold text-rose-500'}>
              {new Date(post.C_CREATED_DATE).getDate()}
            </p>
            <p className={'text-[10px] font-thin text-default-400'}>
              {new Date(post.C_CREATED_DATE).toLocaleString('vi', {
                month: 'long',
              })}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <p className={'text-default-700 font-bold text-md'}>
              {post.C_TITLE}
            </p>
            <p className={'text-default-400 text-xs'}>
              <div
                className={`flex items-center gap-1 text-${
                  post.C_STATUS === 'PRIVATE' ? 'red' : 'green'
                }-500`}
              >
                {post.C_STATUS === 'PRIVATE' && (
                  <IconLockSquareRounded
                    size={16}
                    stroke={2}
                    color={'#d05f5f'}
                  />
                )}
                {post.C_STATUS === 'PUBLIC' && (
                  <IconWorld size={16} stroke={2} color={'#9cd37d'} />
                )}
                <p className={'text-xs italic'}>
                  {post.C_STATUS === 'PRIVATE' ? 'Riêng tư' : 'Công khai'} •{' '}
                  <span 
                    className={'text-default-400'}
                  >{new Date(post.C_CREATED_DATE).toLocaleString('vi', {hour: '2-digit', minute: '2-digit'})}</span>
                </p>
              </div>
            </p>
          </div>
          <div className="h-full">
          <Dropdown>
            <DropdownTrigger>
            <IconDotsCircleHorizontal
              size={20}
              stroke={2}
              color={'gray'}
              className={'cursor-pointer'}
            />
            </DropdownTrigger>
            <DropdownMenu variant="flat" disabledKeys={disableKey} onAction={handleSelectOption}>
              {<DropdownItem
                key={'lock'}
                description={'Ẩn nội dung nhật ký này'}
                color="secondary"                
                startContent={<IconCircleKeyFilled size={22} stroke={2}/>}
              >
                Khoá nhật ký
              </DropdownItem>}
              <DropdownItem
                key={'archive'}
                description={'Bạn có thể xem lại nhật ký này trong lưu trữ'}
                color="danger"
                startContent={<IconArchiveFilled size={22} stroke={2}/>}
              >
                Lưu trữ
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>
        </div>
      </CardHeader>
      <CardBody className={'py-1'}>
        {((isShowContent && post.C_STATUS === 'PRIVATE') ||
          post.C_STATUS === 'PUBLIC') && (
          <p className={'text-default-500 text-sm mt-2 whitespace-pre-line'}>
            {post.C_CONTENT}
          </p>
        )}
        {!isShowContent && post.C_STATUS === 'PRIVATE' && (
          <div className={''}>
            <p className="select-none blur text-default-500 text-sm mt-2 whitespace-pre-line line-clamp-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              quisquam odio quo a sed accusantium aut, eum ipsa ad iste corrupti
              eos quaerat consectetur illum architecto aliquid, vitae, adipisci
              quae. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Minima quisquam odio quo a sed accusantium aut, eum ipsa ad iste
              corrupti eos quaerat consectetur illum architecto aliquid, vitae,
              adipisci quae. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Minima quisquam odio quo a sed accusantium aut, eum ipsa ad
              iste corrupti eos quaerat consectetur illum architecto aliquid,
              vitae, adipisci quae.
            </p>
            {!isShowContent && post.C_STATUS === 'PRIVATE' && <Button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-default-500 text-white"
              auto
              size={'sm'}
              startContent={
                <IconCircleKeyFilled size={16} stroke={2} color={'#d05f5f'} />
              }
              onClick={() => setIsShowContent(true)}
            >
              Giải mã nhật ký
            </Button>}
          </div>
        )}
      </CardBody>
      <CardFooter>
        {post.C_FINGERPRINT && (
          <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
            <p
              className={'text-default-400 text-xs italic'}
              style={{ fontFamily: 'monospace' }}
            >
              Fingerprint: {post.C_FINGERPRINT}
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
