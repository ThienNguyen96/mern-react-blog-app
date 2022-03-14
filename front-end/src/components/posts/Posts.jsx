// import { Link } from 'react-router-dom';
import Post from '../post/post';
import './posts.css';

export default function Posts({posts}) {
    console.log(posts)
    return (
        <div className='posts'>
            {
                posts.map((p)=> (
                    <Post post={p} />
                ))
            }
        </div>
    )
}
