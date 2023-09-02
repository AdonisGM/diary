import {Card, CardBody, CardFooter} from "@nextui-org/react";
import {Fragment, useEffect, useState} from "react";
import {IconLockSquareRounded, IconWorld} from "@tabler/icons-react";
import {Decrypt} from "../../../crypto/encryptAndDecrypt.js";
import {convertTimeToTextAgo} from "../../../common/common.js";

const ListPost = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    decryptPost().then(r => {});
  }, []);

  const decryptPost = async () => {
    console.log(props)
    if (props.post.C_STATUS === 'PRIVATE') {
      const objDecrypt = await Decrypt(props.post.C_CONTENT, props.post.C_COUNTER, props.post.C_FINGERPRINT);
      console.log(objDecrypt)
      setPost({
        ...props.post,
        C_CONTENT: objDecrypt
      })
    }

    if (props.post.C_STATUS === 'PUBLIC') {
      setPost(props.post)
    }
  }

  return (
    <Card
      key={post.PK_DIARY_POST}
      className={'mt-5'}
    >
      <CardBody
        className={'py-3'}
      >
        <div className={`flex items-center gap-1 text-${post.C_STATUS === 'PRIVATE' ? 'red' : 'green'}-500`}>
          {post.C_STATUS === 'PRIVATE' && (
            <Fragment>
              <IconLockSquareRounded size={16} stroke={2} color={'#d05f5f'}/>
              <p className={'text-xs italic'}>
                Riêng tư
              </p>
            </Fragment>
          )}
          {post.C_STATUS === 'PUBLIC' && (
            <Fragment>
              <IconWorld size={16} stroke={2} color={'#9cd37d'}/>
              <p className={'text-xs italic'}>
                Công khai
              </p>
            </Fragment>
          )}
          <p className={'text-xs italic'}>
            • {convertTimeToTextAgo(post.C_CREATED_DATE)}
          </p>
        </div>
        <p className={'text-default-700 font-bold text-md mt-2'}>
          {post.C_TITLE}
        </p>
        <p
          className={'text-default-500 text-sm mt-2 whitespace-pre-line'}
        >
          {post.C_CONTENT}
        </p>
      </CardBody>
      <CardFooter>
        <div className={'flex flex-row items-center justify-end gap-2 mt-2'}>
          <p className={'text-default-400 text-xs italic'} style={{fontFamily: 'monospace'}}>
            Fingerprint: {post.C_FINGERPRINT}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ListPost;