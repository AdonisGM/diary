import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import PostItem from "./PostItem.jsx";
import Cookies from "js-cookie";
import CreatePost from "../../components/createPost/CreatePost"

const Posts = () => {
	const [listPosts, setListPosts] = useState([]);

	useEffect(() => {
		getAllPost()
	}, []);

	const getAllPost = () => {
		let listFingerprints = [];
		if (localStorage.getItem(`key-${Cookies.get('info')}`)) {
			listFingerprints = JSON.parse(localStorage.getItem(`key-${Cookies.get('info')}`)).map((e) => {
				return e.fingerprint
			}).join('|')
		}

		callApi('pkg_diary.get_all', {
			username: undefined,
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

	const handleArchive = (pk_diary_post) => {
		setListPosts(listPosts.filter((item) => {
			return item.PK_DIARY_POST !== pk_diary_post
		}))
	}

  const handleClose = () => {
    getAllPost().then();
  }

	return (
		<div className={'flex flex-col items-center justify-center'}>
			<div className={'max-w-[750px]'}>
				<CreatePost onClose={handleClose}/>
				{listPosts.map((item) => {
						return <PostItem key={item.PK_DIARY_POST} post={item} onArchive={handleArchive} />
				})}
			</div>
		</div>
	)
}

export default Posts;