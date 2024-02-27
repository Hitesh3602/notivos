import { Params } from "@angular/router";

interface PageableSort {
    field: string;
    order: number;
}

export class PageableDto {
    first: number = 0;
    size: number = 10;
    sort: PageableSort = { field: "id", order: PageableDto.ASC };
    query: string = '';

    public constructor(init?: Partial<PageableDto>) {
        Object.assign(this, init);
    }

    toQueryParams(): Params {
        return {
            "first": this.first,
            "size": this.size,
            "s_field": this.sort.field,
            "s_order": this.sort.order,
            "q": this.query
        };
    };

    toApiParams(): string {
        return `page=${~~(this.first! / this.size)}&size=${this.size}&sort=${this.sort.field},${this.sort.order > 0 ? "asc" : "desc"}&q=${this.query}`;
    }

    static readonly ASC: number = 1;
    static readonly DESC: number = -1;
}

export class PageDto {
    content: any[] | undefined;
    totalElements: number | undefined;
}

export class LoginResultDto {
    fullName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    roles: string[] | undefined;

    token: string | undefined;
    expiresIn: number | undefined;
}

export class UserDto {
    id: number | undefined;
    fullName: string | undefined;
    email: string | undefined;
    roles: string[] | undefined;
    locked: boolean | undefined;
    numberOfNotes: number | undefined;
    numberOfShared: number | undefined;
}

export class ProfileDto {
    id: number | undefined;
    fullName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    roles: string[] | undefined;
}

export class CategoryDto {
    id: number | undefined;
    name: string | undefined;
    createAt: string | undefined;
    modifiedAt: string | undefined;
}

export class NoteDto {
    id: number | undefined;
    caption: string | undefined;
    state: string | undefined;
    body: string | undefined;
    category: string | undefined;
    owner: string | undefined;
    createdAt: string | undefined;
    modifiedAt: string | undefined;
    shared: boolean | undefined;
}

export class SharedNoteDto {
    id!: number;
    access!: string;
    createdAt!: string;
    modifiedAt!: string;
    note!: NoteDto;

    static readonly RO: string = 'RO';
    static readonly RW: string = 'RW';
}

export class SharedUserDto {
    id!: number;
    access!: string;
    createdAt!: string;
    modifiedAt!: string;
    user!: UserDto;
}