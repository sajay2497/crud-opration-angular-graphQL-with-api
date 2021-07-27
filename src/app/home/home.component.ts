import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alluser: any;
  showModal: boolean = false;
  checkpopup: boolean = false;
  private allusers = new Subscription();
  updateuserid: any;
  Singleuser: any;

  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.getalluser();
  }

  getalluser() {
    this.apollo.watchQuery({
      query: gql`
        query{
            users {
              id
              name
              email
            }
}`,
    }).valueChanges.subscribe(
      ({ data, loading }) => {
        // console.log(loading);
        // console.log(data);
        this.alluser = data
        // this.unsub();
      }
    )


  }

  unsub() {
    console.log('call');
    this.allusers.unsubscribe();
  }

  //  delete

  deleteuser(id: any) {
    this.apollo.mutate({
      mutation: gql`
            mutation($id:String){
      delete(id:$id){
        success message error
      }
    }`,
      variables: { id: id }
    }).subscribe(
      (res: any) => {
        // console.log(res);
        // if (res.data.delete.success == true) {
        this.getalluser();
        // let newalluser = Object.assign([], this.alluser)
        // this.alluser = newalluser
        // }
      }
    )
  }

  // 

  showpopup() {
    this.showModal = true;
    this.checkpopup = true;
    // console.log(this.showModal);
  }

  hidepopup() {
    this.showModal = false;
    this.checkpopup = false;
    this.Singleuser = null;
    this.updateuserid = null;
  }

  adduser(name: any, email: any, password: any) {
    this.apollo.mutate({
      mutation: gql`
            mutation($name:String, $email: String, $password:String){
              CreateUser(name:$name, email: $email, password: $password){
        success message error
      }
    }`,
      variables: { name: name, email: email, password: password }
    }).subscribe(
      (res: any) => {
        // console.log(res);
        // if (res.data.delete.success == true) {
        this.getalluser();
        this.hidepopup();
        // }
      }
    )
  }
  //  Update

  userupdate(email: any) {
    this.updateuserid = email
    this.showpopup();

    this.apollo.watchQuery({
      query: gql`
        query($email: String){
  singleuser(email:$email){
    name email password id
  }
}`,
      variables: { email: email }
    }).valueChanges.subscribe(
      ({ data, loading }) => {
        // console.log(loading);
        // console.log(data);
        this.Singleuser = data
        // this.unsub();
      }
    )
  }

  updateuser(name: any, password: any, id: any) {

    this.apollo.mutate({
      mutation: gql`
            mutation($id: String, $name: String, $password: String) {
      Update(id: $id, name: $name, password: $password) {
        success
        message
        error
      }
    }`,
      variables: { id: id, name: name, password: password }
    }).subscribe(
      (res: any) => {
        // console.log(res);
        // if (res.data.delete.success == true) {
        this.getalluser();
        this.hidepopup();
        // }
      }
    )

  }

}
