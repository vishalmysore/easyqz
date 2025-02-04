import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(username: any) {
    const user: User = {
      userId: username,
      emailId: null,
      name: username,
      avatar: "https://i.pravatar.cc/150?img=3",
      expertTopics: ["AI", "Cybersecurity", "Machine Learning"],
      achievements: ["Top Scorer", "AI Guru", "Fastest Learner"],
      isPermanent: false  // Set to true if user already has a permanent account// Set emailId as null
    };
    const endpoint = `${environment.apiUrl}createNewUser`;
    return this.http.post<any>(endpoint, user).subscribe(
      (response) => {
        // Store the token in session storage or local storage
        const token = response.token;  // Assuming the response contains the token
        sessionStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', token);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
