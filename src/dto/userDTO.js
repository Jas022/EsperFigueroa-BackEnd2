export class UserDTO {
  constructor(user) {
    this.firstName = user.first_name; 
    this.email = user.email; 
    this.role = user.role; 
  }
}
