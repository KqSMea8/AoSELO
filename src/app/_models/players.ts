export class Player {
    _id: string;
    playerId: number;
    playerFirstName: string;
    playerLastName: string;
    username: string;
    password: string;
    email: string;
    profilePic: string;
    friendsList: Array<string>;
    subFaction: string;
    playerRank: Number;
    orderRank: Number;
    chaosRank: number;
    desRank: number;
    deathRank: number;
    gamesPlayed: number;
    gamesWon: number;
    orderGamesPlayed: number;
    chaosGamesPlayed: number;
    deathGamesPlayed: number;
    desGamesPlayed: number;
    orderGamesWon: number;
    chaosGamesWon: number;
    desGamesWon: number;
    deathGamesWon: number;
    token: string;
}