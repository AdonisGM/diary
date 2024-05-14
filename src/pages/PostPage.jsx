import {useEffect} from "react";
import Posts from "./postPage/Posts.jsx";

const PostPage = () => {
	useEffect(() => {
		document.title = "PostItem | AdonisGM";
	}, []);

	return <Posts/>
}

export default PostPage