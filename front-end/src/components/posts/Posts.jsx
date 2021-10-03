import { Link } from 'react-router-dom';
import Post from '../post/post';
import './posts.css';

export default function Posts() {
    return (
        <div className='posts'>
            <Link className='link' to='post/1'>
                <Post />
            </Link>
            <Link className='link' to='post/2'>
                <Post />
            </Link>
            <Link className='link' to='post/3'>
                <Post />
            </Link>
            <Link className='link' to='post/4'>
                <Post />
            </Link>
            <Link className='link' to='post/5'>
                <Post />
            </Link>
            <Link className='link' to='post/6'>
                <Post />
            </Link>
            <Link className='link' to='post/7'>
                <Post />
            </Link>
            <Link className='link' to='post/8'>
                <Post />
            </Link>
            <Link className='link' to='post/9'>
                <Post />
            </Link>
        </div>
    )
}
