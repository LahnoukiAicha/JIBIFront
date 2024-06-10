import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  //BACKOFIICE

  async register(userData: any, token: string): Promise<any> {
    const url = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(token: string): Promise<any> {
    const url = `${this.apiUrl}/admin/get-all-agents`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.apiUrl}/admin/get-agents/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string, token: string): Promise<any> {
    const url = `${this.apiUrl}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, userData: any, token: string): Promise<any> {
    const url = `${this.apiUrl}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }


  //ADMIN +AGENT

  async login(email: string, password: string): Promise<any> {
    const url = `${this.apiUrl}/auth/login`;
    try {
      const response = await this.http.post<any>(url, { email, password }).toPromise();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('mustChangePassword', response.mustChangePassword);
        console.log('mustChangePassword:', response.mustChangePassword);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

 //AGENTAPP

  async changePassword(newPassword: string): Promise<any> {
    const url = `${this.apiUrl}/change-password`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, { password: newPassword }, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async createClient(userData: any, token: string): Promise<any> {
    const url = `${this.apiUrl}/createClient`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.post<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllClients(token: string): Promise<any> {
    const url = `${this.apiUrl}/agent/get-all-clients`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //AGENT + CLIENT
  async getAgentProfile(token: string): Promise<any> {
    const url = `${this.apiUrl}/agent/getProfile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching profile', error);
      throw error;
    }
  }
  async getClientProfile(token: string): Promise<any> {
    const url = `${this.apiUrl}/client/getProfile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching profile', error);
      throw error;
    }
  }

  //CLIENTAPP

  async loginClient(tel: string, password: string): Promise<any> {
    const url = `${this.apiUrl}/loginClient`;
    try {
      const response = await this.http.post<any>(url, { tel, password }).toPromise();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('mustChangePassword', response.mustChangePassword);
        console.log('mustChangePassword:', response.mustChangePassword);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePasswordClient(newPassword: string): Promise<any> {
    const url = `${this.apiUrl}/changePasswordClient`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try {
      const response = await this.http.put<any>(url, { password: newPassword }, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }







  logOut(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'ADMIN';
    }
    return false;
  }

  isUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'AGENT';
    }
    return false;
  }
}
