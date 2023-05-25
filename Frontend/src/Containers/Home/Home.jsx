import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import {PostCard, Navbar, Loader} from '../../Components/Index';
import { InscribleContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Home = () => {

    const navigate = useNavigate();
    const { GetPostByUser, isLoading, singleUserPost, connectedAccount, getSignInState, ConnectWallet, contract } = useContext(InscribleContext);

    const notify= (msg)=> toast.error(msg);
    const [isSigned, setIsSigned] = useState(false);

    useEffect(()=>{
        const state = getSignInState();
        setIsSigned(state);

        const fetchdata = async ()=>{
            await ConnectWallet();
            await GetPostByUser(connectedAccount);
        };

        fetchdata();

    },[]);

    useEffect(()=>{
        const fetchdata = async ()=>{
            await GetPostByUser(connectedAccount);
        };

        fetchdata();
    },[connectedAccount, contract]);

    const backToSignIn = ()=>{
        if (!isSigned) {
            navigate('/')
        };
    };

    const noPostMsg = ()=>{
        notify("No Posts Created Yet !");
    };

    return (
        <>
            {isSigned ? (
                <>
                    <Navbar />
                    {isLoading ? <Loader /> : 
                       (singleUserPost.length > 0 ? 
                            (
                            singleUserPost.map((item) => {
                                return <PostCard 
                                        username={item.createrName}
                                        address={item.userAddress} 
                                        file={item.imageHash}
                                        caption={item.caption}
                                        imageText={item.imageText}
                                        likeCount={item.likeCount._hex}
                                        key={item.id}
                                       />
                            }))  
                            :
                            noPostMsg()
                       )
                    }
                </>
            )
            :
                backToSignIn()
            }
        </>
    );
}

export default Home;
