export interface Board {
    id: string;
    user: string;
    email: string;
    title: string;
    content: string;
    published: Date;
    // comment: {
    //   id: string;
    //   board: string;
    //   comment: string;
    //   published: Date;
    // }
}

export interface BoardTemp {
    id: string;
    user: string;
    email: string;
    title: string;
    content: string;
    published: Date;
    comments: [{
        id: string;
        board: string;
        email: string;
        comment: string;
        published: Date;
    }]
}

export interface BoardPagination {
    count: number;
    next: string;
    previous: string;
    results: {
        id: string;
        user: string;
        email: string;
        title: string;
        content: string;
        published: Date;
        // comment: {
        //   id: string;
        //   board: string;
        //   comment: string;
        //   published: Date;
        // }
    }
}

export interface BoardPaginationTemp {
    count: number;
    next: string;
    previous: string;
    results: {
        id: string;
        user: string;
        email: string;
        title: string;
        content: string;
        published: Date;
        comments: [{
            id: string;
            email: string;
            board: string;
            comment: string;
            published: Date;
        }]
    }
}

export interface Comment {
    id: number;
    email: string;
    board: number;
    comment: string;
    published: Date;
}
