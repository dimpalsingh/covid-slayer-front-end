import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuthenticationService, GameService } from '@/_services';

@Component({ 
    templateUrl: 'home.component.html',
    //styleUrls: ['./home.component.css']
 })
export class HomeComponent implements OnInit {
    currentUser: User;
    showGame = false;

    playerHealth = 100;
    monsterHealth = 100;
    loading = false;

    gameTime = 60;

    gameTimer = null;

    nextPlayerTurnTimer = null;
    nextMonsterTurnTimer = null;

    gameSessionObj = null;

    constructor(
        private authenticationService: AuthenticationService,
        private gameService: GameService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        //this.getUser();
        this.getActiveSession();
    }
    
    startTimer(){
        const thisRef = this;
        if(this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        this.gameTimer = setInterval(()=>{
            if(thisRef.gameTime >= 1) {
                thisRef.gameTime--;
            } else {
                clearInterval(thisRef.gameTimer);
            }
        }, 1000);
    }

    startGame() {
        this.loading = true;
        this.gameService.start()
            .pipe(first())
            .subscribe((data: any) => {
                //alert('dd')
                this.loading = false;
                if(!data.error) {
                    //alert('remainingSeconds');
                    this.gameSessionObj = data.gameSessionData;
                    let remainingSeconds = 60 - (((new Date()).getTime()/1000) - +(this.gameSessionObj['start_timestamp'] || 0));
                    if(remainingSeconds > 0) {
                        this.gameTime = remainingSeconds;
                        this.showGame = true;
                        this.startTimer();
                    } else {
                        this.showGame = false;
                    }
                }
            });
    }

    /*deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }*/


    private getActiveSession() {
        this.loading = true;
        this.gameService.getActiveSession()
            .pipe(first())
            .subscribe((data: any) => {
                //alert('dd')
                this.loading = false;
                if(!data.error) {
                    this.gameSessionObj = data;
                    let remainingSeconds = ((new Date()).getTime()/1000) - this.gameSessionObj['start_timestamp'];
                    if(remainingSeconds > 0) {
                        this.gameTime = remainingSeconds;
                        this.startTimer();
                    } else {
                        this.showGame = false;
                    }
                }
            });
    }
}