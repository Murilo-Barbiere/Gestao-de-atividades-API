export class UserEntity{
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public senha: string
    ){}
}