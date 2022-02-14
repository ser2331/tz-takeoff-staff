import axios from 'axios';

class ApiService {
    _baseApi = ' http://localhost:3000/';

    _user = 'user';

    _people = 'people/';

    // eslint-disable-next-line no-return-await,no-underscore-dangle
    getUser = async () => await axios.get(this._baseApi + this._user, {});

    // eslint-disable-next-line no-underscore-dangle
    getPeople = async () => await axios.get(this._baseApi + this._people, {});

    // eslint-disable-next-line no-underscore-dangle,no-unused-vars
    delContact = async (id) => await axios.delete(this._baseApi + this._people + id);

    // eslint-disable-next-line no-underscore-dangle
    saveStatus = async (item, status) => await axios.put(this._baseApi + this._people + item.id, {
        name: item.name,
        avatar: item.avatar,
        status,
    });

    // eslint-disable-next-line no-underscore-dangle
    addContact = async (name, status, avatar, id) => await axios.post(this._baseApi + this._people,
        name,
        avatar,
        status,
        id);
}
export default ApiService;
