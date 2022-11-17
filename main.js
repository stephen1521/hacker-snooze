let storyDiv = document.querySelector('#stories');
let storyArr = [];
let commentArr = [];
let start = 0;
let end = 20;
let askBool = false;
let topBool = true;


//https://hacker-news.firebaseio.com/v0/item/id.json?print=pretty
let topStoriesApi = async () => {
    let res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    let data = await res.json();
    for(let i = start; i < end; i++){
        let id = data[i];
        let res2 = await fetch('https://hacker-news.firebaseio.com/v0/item/'+ id + '.json?print=pretty');
        let data2 = await res2.json();
        storyArr.push(data2);
    }
    for(let i = start; i < end; i++){
        if(storyArr[i].kids === undefined){
            let obj = {
                num: i,
                comments: []
            }
            commentArr.push(obj);
            continue;
        }else{
            let localCommentArr = [];
            let commentList = storyArr[i].kids;
            for(let j = 0; j < commentList.length; j++){
                let commentId = commentList[j];
                let res3 = await fetch('https://hacker-news.firebaseio.com/v0/item/'+ commentId + '.json?print=pretty');
                let data3 = await res3.json();
                localCommentArr.push(data3.text);
            }
            let obj = {
                num: i,
                comments: localCommentArr
            }
            commentArr.push(obj);
        }
    }
    for(let i = start; i < end; i++){
        let storyObj = storyArr[i];
        createCard(storyObj, i);
    }
    start += 20;
    end += 20;
}
topStoriesApi();

function createCard(storyObj, index){
    let cardDiv = document.createElement('div');
    let title = document.createElement('div');
    let ul = document.createElement('ul');
    let userName = document.createElement('li');
    let comments = document.createElement('li');
    let score = document.createElement('li');
    cardDiv.appendChild(title);
    cardDiv.appendChild(ul);
    ul.appendChild(userName);
    ul.appendChild(comments);
    ul.appendChild(score);
    cardDiv.classList.add('card');
    cardDiv.style.width = '18rem';
    title.classList.add('card-header');
    ul.classList.add('list-group');
    ul.classList.add('list-group-flush');
    userName.classList.add('list-group-item');
    comments.classList.add('list-group-item');
    comments.classList.add('comment');
    comments.setAttribute('id',String(index));
    score.classList.add('list-group-item');
    storyDiv.appendChild(cardDiv);
    title.innerText = 'Title: ' + storyObj.title;
    userName.innerText = 'UserName: ' + storyObj.by;
    if(storyObj.descendants === undefined){
        comments.innerText = 'Comments: ' + '0';
    }else{
        comments.innerText = 'Comments: ' + storyObj.descendants;
    }
    score.innerText = 'Score: ' + storyObj.score;
    storyLink(storyObj.url, title);
    commentLink(comments);
}

let button = document.querySelector('#loadMore');
button.addEventListener('click', () => {
    topStoriesApi();
})

function storyLink (storyUrl, element){
    element.addEventListener('click', () => {
        window.open(storyUrl);
    })
}
let buttonDiv = document.querySelector('#buttonDiv');
let commentDiv = document.querySelector('#comments');
let goBackButton = commentDiv.querySelector('#goBack');
let commentList = document.querySelector('#commentList');

function commentLink (element){
    element.addEventListener('click', (event) => {
        storyDiv.classList.toggle('none');
        buttonDiv.classList.toggle('none');
        commentDiv.classList.toggle('none');
        document.querySelector('body').scrollTop = document.documentElement.scrollTop = 0;
        let num = event.target.getAttribute('id');
        let commentsDisplay = document.createElement('ul');
        commentsDisplay.classList.add('list-group');
        commentsDisplay.classList.add('removeLater');
        commentList.appendChild(commentsDisplay);
        for(let i = 0; i < commentArr[num].comments.length; i++){
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = (i + 1) + '. ' + commentArr[num].comments[i];
            commentsDisplay.appendChild(li);
        }
        commentList.classList.toggle('none');
    })
}

goBackButton.addEventListener('click', () => {
    storyDiv.classList.toggle('none');
    buttonDiv.classList.toggle('none');
    commentDiv.classList.toggle('none');
    commentList.classList.toggle('none');
    let ulToRemove = document.querySelector('.removeLater');
    commentList.removeChild(ulToRemove);
})

let navAsk = document.querySelector('#navAsk');
let navTop = document.querySelector('#navTop');
let topStoriesDiv = document.querySelector('#topStories');
let latestAsk = document.querySelector('#latestAsk');
let secondHeader = document.querySelector('#secondHeader');

navAsk.addEventListener('click', () => {
    if(askBool){
    }else{
        topStoriesDiv.classList.toggle('none');
        latestAsk.classList.toggle('none');
        secondHeader.innerText = 'Ask Stories';
        askBool = true;
        topBool = false;
    }
});

navTop.addEventListener('click', () => {
    if(topBool){
    }else{
        topStoriesDiv.classList.toggle('none');
        latestAsk.classList.toggle('none');
        secondHeader.innerText = 'Top Stories';
        topBool = true;
        askBool = false;
    }
});


///////////////////////////
//////////////////////////
//////////ask tab/////////
//////////////////////////
//////////////////////////

let start1 = 0;
let end1 = 20;
let askArr = [];
let askCommentArr = [];
let askList = document.querySelector('#askList');

let askApi = async() => {
    let res = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty');
    let data = await res.json();
    for(let i = start1; i < end1; i++){
        let id = data[i];
        let res2 = await fetch('https://hacker-news.firebaseio.com/v0/item/'+ id + '.json?print=pretty');
        let data2 = await res2.json();
        askArr.push(data2);
    }
    for(let i = start1; i < end1; i++){
        if(askArr[i].kids === undefined){
            let obj = {
                num: i,
                comments: []
            }
            askCommentArr.push(obj);
            continue;
        }else{
            let localCommentArr = [];
            let commentList = askArr[i].kids;
            for(let j = 0; j < commentList.length; j++){
                let commentId = commentList[j];
                let res3 = await fetch('https://hacker-news.firebaseio.com/v0/item/'+ commentId + '.json?print=pretty');
                let data3 = await res3.json();
                localCommentArr.push(data3.text);
            }
            let obj = {
                num: i,
                comments: localCommentArr
            }
            askCommentArr.push(obj);
        }
    }
    for(let i = start1; i < end1; i++){
        let askObj = askArr[i];
        createCard1(askObj, i);
    }
    start1 += 20;
    end1 += 20;
}

function createCard1(askObj, index){
    let cardDiv = document.createElement('div');
    let title = document.createElement('div');
    let ul = document.createElement('ul');
    let userName = document.createElement('li');
    let comments = document.createElement('li');
    let score = document.createElement('li');
    cardDiv.appendChild(title);
    cardDiv.appendChild(ul);
    ul.appendChild(userName);
    ul.appendChild(comments);
    ul.appendChild(score);
    cardDiv.classList.add('card');
    cardDiv.style.width = '18rem';
    title.classList.add('card-header');
    ul.classList.add('list-group');
    ul.classList.add('list-group-flush');
    userName.classList.add('list-group-item');
    comments.classList.add('list-group-item');
    comments.classList.add('comment');
    comments.setAttribute('id',String(index));
    score.classList.add('list-group-item');
    askList.appendChild(cardDiv);
    title.innerText = 'Title: ' + askObj.title;
    userName.innerText = 'UserName: ' + askObj.by;
    if(askObj.descendants === undefined){
        comments.innerText = 'Comments: ' + '0';
    }else{
        comments.innerText = 'Comments: ' + askObj.descendants;
    }
    score.innerText = 'Score: ' + askObj.score;
    commentLink1(comments);
}

askApi();

let buttonDiv1 = document.querySelector('#askButtonDiv');
let commentDiv1 = document.querySelector('#askComments');
let goBackButton1 = commentDiv1.querySelector('#goBack1');
let commentList1 = document.querySelector('#askCommentList');

function commentLink1(element){
    element.addEventListener('click', (event) => {
        askList.classList.toggle('none');
        buttonDiv1.classList.toggle('none');
        commentDiv1.classList.toggle('none');
        document.querySelector('body').scrollTop = document.documentElement.scrollTop = 0;
        let num = event.target.getAttribute('id');
        let commentsDisplay = document.createElement('ul');
        commentsDisplay.classList.add('list-group');
        commentsDisplay.classList.add('removeLater1');
        commentList1.appendChild(commentsDisplay);
        for(let i = 0; i < askCommentArr[num].comments.length; i++){
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = (i + 1) + '. ' + askCommentArr[num].comments[i];
            commentsDisplay.appendChild(li);
        }
        commentList1.classList.toggle('none');
    })
}

goBackButton1.addEventListener('click', () => {
    askList.classList.toggle('none');
    buttonDiv1.classList.toggle('none');
    commentDiv1.classList.toggle('none');
    commentList1.classList.toggle('none');
    let ulToRemove = document.querySelector('.removeLater1');
    commentList1.removeChild(ulToRemove);
})

let button1 = document.querySelector('#loadMore1');
button1.addEventListener('click', () => {
    askApi();
})