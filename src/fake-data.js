import userImage from './assets/images/Profile-Pic-S.png';
import postImage from './assets/images/Post.png';
import post1Image from './assets/images/Post (2).png';
import post2Image from './assets/images/Post (3).png';

export default class FakeData {
    static userInfo = {
        firstname: 'Мегатрон',
        lastname: 'Одинсон',
        id: '1',
        image: userImage,
    };

    static contactList = [
        {
            name: 'Седезнёв Антон',
            value: '1',
            imagePost: postImage,
        }, {
            name: 'Зорошев Яромир',
            value: '2',
            imagePost: post1Image,
        }, {
            name: 'Мельников Тарас',
            value: '3',
            imagePost: post2Image,
        }, {
            name: 'Медведев Зураб',
            value: '4',
            imagePost: post2Image,
        }, {
            name: 'Сердюк Фёдор',
            value: '5',
            imagePost: postImage,
        }, {
            name: 'Ширяев Сергей',
            value: '6',
            imagePost: post1Image,
        }, {
            name: 'Бирюков Никодим',
            value: '7',
            imagePost: post2Image,
        }, {
            name: 'Хитрук Бронислав',
            value: '8',
            imagePost: postImage,
        },
    ];
}
