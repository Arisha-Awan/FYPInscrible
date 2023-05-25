//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Inscrible {
    
    //USER STRUCT
    struct User{
        string username;
        friend[] followersList;
        friend[] followingsList;
        //chawala
        Post [] myPosts;
        // string profilePic; do add later
    }

    struct AllUserStruck{
        string username;
        address accountAddress;
    }

    AllUserStruck[] AllUsers;
    
   struct friend{
        address pubkey;
        string name;
    }
    //POST COUNT
    uint postCount = 0;
    ///Friend list
   
    mapping(address=>Post[]) AllFriendPosts;

    //CONTAINING ALL THE POSTS UPLOADED BY USERS
    struct Post{
        string createrName;
        address payable userAddress;
        string imageHash;
        string caption;
        string imageText;
        uint256  tipAmount;
        uint256 id;
        uint likeCount;
        string [] likedByUser;
    }


    mapping(address=>User) userList;
    // User [] allRegisteredUsers;
    mapping(address=>Post[]) singleUserPostList;
    Post [] allposts;


    //FUNCTIONS----------------------------

    //CHECK IS A USER HAS AN ACCOUNT
    function checkUser(address key) public view returns(bool){
        if(AllUsers.length > 0)
        return bytes(userList[key].username).length > 0;
        else{
            return false;
        }
    }

    //GET USER NAME
    function getUsername(address key) public view returns(string memory){
        return userList[key].username;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata _username) external {
        require(checkUser(msg.sender) == false, "User alredy has an account!");
        require(bytes(_username).length > 0, "User name should not be empty!");

        userList[msg.sender].username = _username;
        AllUsers.push(AllUserStruck(_username, msg.sender));
    }
    //addFriend Function
    //this function will add the msg.sender(follower) in the followersList of the person whom he is following
    //following_key is the address of the person whom he is following
     function addFriend(address following_key) external{
        //msg.sender is actually the follower
        require(checkUser(msg.sender), "Create an account first");
        require(checkUser(following_key), "User is not registered!");
        require(msg.sender != following_key, "Users cannot add themeselves as friends");
        require(checkAlreadyFriends(msg.sender,following_key)== false, "These users are already friends");

         //_addFriend(msg.sender, friend_key, name);
          _addFriend(following_key, msg.sender, userList[msg.sender].username);

         for(uint256 i=0;i<userList[following_key].myPosts.length;i++)
         {
            singleUserPostList[msg.sender].push(userList[following_key].myPosts[i]);
         }
    }
    //checkAlreadyFriend
    //will check if me(msg.sender means follower) exist in the followerList of the perosn whom he is following
    function checkAlreadyFriends(address me,address following_key) public view returns (bool){

        for(uint256 i = 0; i < userList[following_key].followersList.length; i++){
            
            if(userList[following_key].followersList[i].pubkey == me) return true;
        }
        return false;
    }
    //_AddFriend
    function _addFriend(address following_key, address me, string memory name) internal{
        friend memory newFollower = friend(me, name);
        userList[following_key].followersList.push(newFollower);

        friend memory newFollowing = friend(following_key, userList[following_key].username);
        userList[me].followingsList.push(newFollowing);
    }


    function removeFriend(address followingAddress) public {

        //Removing follower(msg.sender) from the followerList of our following(followingAddress)
        uint256 followerIndex;
        bool found = false;

        // Find the index of the friend in the array
        for (uint256 i = 0; i < userList[followingAddress].followersList.length; i++) {
            if (userList[followingAddress].followersList[i].pubkey == msg.sender) {
                followerIndex = i;
                found = true;
                break;
            }
        }
        // If the friend is found, remove it
        if (found) {
            // Replace the element at friendIndex with the last element
            userList[followingAddress].followersList[followerIndex] = userList[followingAddress].followersList[userList[followingAddress].followersList.length - 1];
            // Reduce the size of the array by one
            userList[followingAddress].followersList.pop();
       }

        //------------------------------------------------------------------------------
        //Removing followingAddress from our followingList
        //-------------------------------------------------------------------------------

        uint256 followingIndex;
        bool foundFollowing = false;

        // Find the index of the friend in the array
        for (uint256 i = 0; i < userList[msg.sender].followingsList.length; i++) {
            if (userList[msg.sender].followingsList[i].pubkey == followingAddress) {
                followingIndex = i;
                foundFollowing = true;
                break;
            }
        }
        // If the friend is found, remove it
        if (foundFollowing) {
            // Replace the element at friendIndex with the last element
            uint256 lengthOfFollowingList  = userList[msg.sender].followingsList.length;
            userList[msg.sender].followingsList[followingIndex] = userList[msg.sender].followingsList[lengthOfFollowingList - 1];
            // Reduce the size of the array by one
            userList[msg.sender].followingsList.pop();
       }


    }

    //GETMY FRIEND
    function getMyFollowersList() external view returns(friend[] memory){
        return userList[msg.sender].followersList;
    }
    function getMyFollowingsList() external view returns(friend[] memory){
        return userList[msg.sender].followingsList;
    }

    //TO POST IMAGES TO BLOCKCHAIN
    function addPostImage(string memory _imgHash, string memory desc, string memory imgText) public 
    {   
        require(checkUser(msg.sender), "User not registered!");
        require(bytes(_imgHash).length > 0);
        postCount++;
        Post memory newPost = Post({
            createrName: userList[msg.sender].username,
            userAddress: payable(msg.sender),
            imageHash: _imgHash,
            caption: desc,
            imageText: imgText,
            tipAmount:0,
            id:postCount,
            likeCount:0,
            likedByUser : new string[](0)         
        });
            
        for(uint256 i = 0; i < userList[msg.sender].followersList.length; i++){
              singleUserPostList[userList[msg.sender].followersList[i].pubkey].push(newPost);
         } 
        userList[msg.sender].myPosts.push(newPost);
        singleUserPostList[msg.sender].push(newPost);
        allposts.push(newPost);
        
    }

    function getAllPosts() public view returns(Post [] memory){
        return allposts;
    }
    
   function getAllAppUser() public view returns(AllUserStruck[] memory){
        return AllUsers;
    }

    function getSingleUserPost(address key) public view returns(Post [] memory) {
        if (singleUserPostList[key].length > 0) {
            return singleUserPostList[key];
        } else {
            return new Post[](0);
        }
    }

    function getSingleUserLatestPost(address key) public view returns(Post memory){
        
            return  singleUserPostList[key][singleUserPostList[key].length-1]; 
        
    } 
    ////friends posts 

    //  function _AllFriendPosts()  internal {
    //     address friendAddress;
    //     Post [] memory postArray;
    //     require(userList[msg.sender].followersList.length >0, "You have no friends" );
    //     for (uint256 i = 0; i < userList[msg.sender].followersList.length; i++){
    //     friendAddress = userList[msg.sender].followersList[i].pubkey;
    //     postArray=getSingleUserPost(friendAddress);
    //     for (uint256 j = 0; j <postArray.length; j++){
    //         AllFriendPosts[msg.sender].push(postArray[j]);
    //     }
    //    }  
    // }

    //   function getAllFriendPosts() public view returns (Post[] memory){
    //      return AllFriendPosts[msg.sender];
    //    }

    
    receive() external payable {}
}