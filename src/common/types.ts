export class Report {
  public date: string = '';
  public userData: UserData = {} as UserData;
  public status:object;

  constructor(date: string = null, userData: UserData = null, status: object = null) {
    this.date = date;
    this.userData = userData;
    this.status = status;
  }

}

export type UserData = {
  reporterName: string;
  reporterEmail: string;
  receiverName: string;
  receiverEmail: string;
}
