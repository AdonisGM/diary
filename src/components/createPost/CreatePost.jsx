import {
  Button, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Select, SelectItem,
  Textarea,
  useDisclosure
} from "@nextui-org/react";
import {Fragment, useEffect, useRef, useState} from "react";
import {IconLockSquareRounded, IconWorld} from "@tabler/icons-react";
import {GenerateKey, Encrypt} from '../../crypto/encryptAndDecrypt'
import GatewayApi from "../../apis/GatewayApi.js";
import Cookies from "js-cookie";

const listOptions = [
  {
    id: 'PUBLIC',
    name: 'Công khai',
    icon: <IconWorld size={18} stroke={2} color={'#9cd37d'}/>,
    color: 'green'
  },
  {
    id: 'PRIVATE',
    name: 'Riêng tư',
    icon: <IconLockSquareRounded size={18} stroke={2} color={'#d05f5f'}/>,
    color: 'red'
  }
]

const CreatePost = (props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const summaryRef = useRef(null);
  const contentRef = useRef(null);
  const [option, setOption] = useState('PRIVATE');

  useEffect(() => {
    console.log('CreatePost')

    const username = localStorage.getItem('username');
    const hasRsaKey = localStorage.getItem(`key-${username}`);
    if (!hasRsaKey) {
      GenerateKey(username).then(r => {
        console.log(r);
      }, e => {
        console.log(e);
      })
    }
  }, [])

  const handleOpen = () => {
    onOpen();
  }

  const submitPost = async () => {
    const summary = summaryRef.current.value;
    const content = contentRef.current.value;
    let encrypted = null;
    let fingerprint = null;
    let counter = null;

    if (option === 'PRIVATE') {
      try {
        let objEncrypt = await Encrypt(content);
        fingerprint = objEncrypt.fingerprint;
        encrypted = objEncrypt.resultEncode;
        counter = objEncrypt.counter;
      } catch (e) {
        console.log(e.message)
      }
    } else {
      encrypted = content;
    }

    try {
      await GatewayApi('pkg_diary.add_post', {
        title: summary,
        content: encrypted,
        status: option,
        fingerprint: fingerprint,
        counter: counter
      })

      onClose();
      props.onClose();
    } catch (e) {

    }
  }

  return (
    <Fragment>
      {/* Create */}
      <div
        onClick={handleOpen}
        className={'mt-5 flex flex-col items-center justify-center p-5 rounded-xl border-dashed border-default-300 border-2 cursor-pointer text-default-500 text-sm '}
      >
        Bạn ổn không? Kể cho mình nghe với, mình sẽ giữ bí mật và luôn ở đây với bạn. Nhấn vào mình để bắt đầu viết nhé!
      </div>
      <Modal
        size={'3xl'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className={'text-default-500 text-md font-bold'}>
                  Tạo nhật ký
                </p>
              </ModalHeader>
              <ModalBody>
                <Input ref={summaryRef} size={'sm'} variant={'flat'} labelPlacement={'outside'} placeholder={'Hôm nay bạn nghĩ về gì?'} label={'Chủ đề'}/>
                <Textarea ref={contentRef} minRows={14} maxRows={14} size={'sm'} variant={'flat'} labelPlacement={'outside'} placeholder={'Viết gì đó đi bạn ơi!'} label={'Nội dung'}/>
                <Select
                  items={listOptions}
                  label="Trạng thái"
                  placeholder="Chọn trạng thái"
                  labelPlacement="outside"
                  className="w-1/4"
                  size={'md'}
                  defaultSelectedKeys={["PRIVATE"]}
                  onChange={(value) => {
                    setOption(value.target.value)
                  }}
                  renderValue={(options) => {
                    return options.map((option) => (
                      <div key={option.data.id}>
                        <div className="flex gap-2 items-center">
                          {option.data.icon}
                          <span
                            className={`text-${option.data.color}-500`}
                          >{option.data.name}</span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(option) => (
                    <SelectItem key={option.id} textValue={option.name}>
                      <div className="flex gap-2 items-center">
                        {option.icon}
                        <span
                          className={`text-${option.color}-500`}
                        >{option.name}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm" color="danger" variant="light" onPress={onClose}>
                  Huỷ bỏ
                </Button>
                <Button
                  size="sm"
                  className={'bg-default-900 text-white'}
                  onPress={submitPost}
                >
                  Lưu lại
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default CreatePost