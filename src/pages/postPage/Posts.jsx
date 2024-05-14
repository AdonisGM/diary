import {useEffect, useState} from "react";
import callApi from "../../apis/GatewayApi.js";
import PostItem from "./PostItem.jsx";
import Cookies from "js-cookie";

const Posts = () => {
	const [listPosts, setListPosts] = useState([]);

	useEffect(() => {
		getAllPost()
	}, []);

	const getAllPost = () => {
		console.log(123123)
		let listFingerprints = [];
		listFingerprints = JSON.parse(localStorage.getItem(`key-${Cookies.get('info')}`)).map((e) => {
			return e.fingerprint
		}).join('|')

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

	return (
		<div>
			{listPosts.map((item) => {
					return <PostItem key={item.PK_DIARY_POST} post={item} onArchive={handleArchive} />
			})}
		</div>
	)
}

export default Posts;