import PostDetail from '../../components/PostDetail/PostDetail';
import Sidebar from '../../components/sidebar/sidebar';
import './single.css';

export default function Single() {
    return (
        <div className='single'>
            <PostDetail />
            <Sidebar />
        </div>
    )
}
