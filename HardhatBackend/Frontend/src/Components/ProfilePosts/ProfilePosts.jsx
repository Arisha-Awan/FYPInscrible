import React, { useState } from 'react';
import './ProfilePosts.css';
import { PostCard } from '../Index';

const ProfilePosts = () => {

    const [isUserPosts, setIsUserPosts] = useState(true);
    const [isSavedPosts, setIsSavedPosts] = useState(false);

    const arr = ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'];
    const arr2 = ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'];

    return (
        <>
            <div className='post-type-selection'>
                <div className={isUserPosts ? "post-type-selector active" : "post-type-selector"} onClick={() => {
                    setIsSavedPosts(false);
                    setIsUserPosts(true);
                }}>
                    <span class="material-symbols-outlined">
                        grid_on
                    </span>
                    <span className="selector-text">Posts</span>
                </div>
                <div className={isSavedPosts ? "post-type-selector active" : "post-type-selector"} onClick={() => {
                    setIsSavedPosts(true);
                    setIsUserPosts(false);
                }}>
                    <span class="material-symbols-outlined">
                        grid_on
                    </span>
                    <span className="selector-text">Saved</span>
                </div>
            </div>
            {isUserPosts && (
                arr.map((item, i) => {
                    // return <PostCard src={item} key={i}/>
                })

            )}

            {isSavedPosts && (
                arr2.map((item, i) => {
                    // return <PostCard src={item} key={i}/>
                })
            )}
        </>
    );
};

export default ProfilePosts;
