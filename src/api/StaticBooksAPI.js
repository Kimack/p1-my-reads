/**
 * Current available shelves
 */
const shelves = [
    {
        id: "currentlyReading",
        title: "Currently Reading"
    },
    {
        id: "wantToRead",
        title: "Want to Read"
    },
    {
        id: "read",
        title: "Read"
    }
]

class StaticBooksAPI {
    /**
     * @return Available shelves
     */
    static getShelves() {
        return Promise.resolve(shelves);
    }
}

export default StaticBooksAPI;