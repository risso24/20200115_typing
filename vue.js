
      new Vue({
        el: "#typeGame",
        data: {
          display_button :false,
          correctNumber: 0,
          currentQuizSentence: "",
          level: 1,
          defaultTimer: "",
          wpm: 100,
          quizNumber: 0,
          timers: [],
          defaultColor: '#000',
          defaultFontSize: '3em',
          defaultFontFamily: 'sans-serif',
          defaultBackgroundColor: '#fff',
          typedSentence: "",
          // 0: key, 1:value , 3:quizSentence
          // 'Comic Sans MS'
          questions: [
            [
                "font-family",
                "'Comic Sans MS', cursive",
                "font-family: 'Comic Sans MS', cursive;"
             ],
              [
                "font-family",
                "'Tahoma', sans-serif",
                "font-family: 'Tahoma', sans-serif;"
                ],
              [
                "font-family",
                "'arial black', sans-serif",
                "font-family: 'arial black', sans-serif;"
                  ],
               [
                "font-family",
                "'Estrangelo Edessa', serif",
                "font-family: 'Estrangelo Edessa', serif;"
                 ],
              [
                "font-size",
                "50px",
                "font-size: 50px;"
              ],
              [
                 "font-size",
                  "4em",
                  "font-size: 4em;"
                ],
              [
              "font-size",
                "30px",
                "font-size: 30px;"
              ],
              [
                "font-size",
                  "14px",
                  "font-size: 14px;"
                ],
              [  
                "background-color",
                "rgb(245, 181, 212)",
                "background-color: rgb(245, 181, 212);"
              ],
              [  
                "background-color",
                "#fcf6ca",
                "background-color: #fcf6ca;"
              ],
              [  
                "background-color",
                "rgb(18, 119, 135)",
                "background-color: rgb(18, 119, 135);"
               ],
             [
              "font-color",
              "#24d633",
              "color: #24d633;"
            ],
            [
             "font-color",
             "#40e0d0",
             "color: #40e0d0;"
              ],
            [
            "font-color",
            "#ff6347",
            "color: #ff6347;"
              ],
            [
            "font-color",
            "#4b0082",
            "color: #4b0082;"
                ],
            ]   
        },
        computed: {
          // 入力された文章/問題の文章切り替え
          currentSentence() {
            const numberOfTyped = this.typedSentence.length;
            const nowQuiz = this.questions[this.quizNumber][2];
            const restSentence = nowQuiz.slice(numberOfTyped);
            return restSentence;
          },

        },
        methods: {
          // クイズ（番号のリセット
          resetQuiz() {
            this.typedSentence = "";
            const newQuizNumber = Math.floor(
              Math.random() * this.questions.length
            );
            this.quizNumber = newQuizNumber;
            this.currentQuizSentence = this.questions[newQuizNumber][2];
          },
          // 文字数に合わせて制限時間を変更
          getTimer() {
            const lengthOfSentence = this.questions[this.quizNumber][2].length;
              this.defaultTimer = Math.floor((
                lengthOfSentence * (60 / this.wpm)
              ));
          },
          // タイマーリセット
          resetTimer() {
            this.timers.map((timer) => clearTimeout(timer))
            this.timers = []
          },
          countTimer() {
            this.resetTimer() // すでに登録済みのタイマーをリセット
            const countdown = () => {
                this.defaultTimer--;
                const timer = setTimeout(countdown, 1000);
                this.timers.push(timer) // 登録したタイマーを保存
                if (this.defaultTimer < 0) {
    　            this.resetTimer() // すでに登録済みのタイマーをリセット
                  this.resetQuiz();
                  this.getTimer();
                  countdown();
                }
              }
            document.getElementById('startText').focus();
            this.resetQuiz();
            this.getTimer();
            countdown();
          },
          changeElements() {
            switch (this.questions[this.quizNumber][0]){
              case "font-color":
                this.defaultColor = this.questions[this.quizNumber][1];
                break
              case "font-size":
                this.defaultFontSize = this.questions[this.quizNumber][1];
                break
              case "background-color":
                this.defaultBackgroundColor = this.questions[this.quizNumber][1];
                break
              case "font-family":
                this.defaultFontFamily = this.questions[this.quizNumber][1]; 
                break
            }
          },
          startQuiz() {
            this.display_button = true;
            this.countTimer();
          },
          correctCheck() {
            const typedText = this.typedSentence.length;
            //タイプ間違えたら色が変わる
            if (this.typedSentence !== this.questions[this.quizNumber][2].slice(0, typedText)) {
                document.getElementById("target").style.color = "red";
            } else {
              document.getElementById("target").style.color = this.defaultBackgroundColor;
            }

            //正解したら正解数アップ&10問正解でレベルアップ
            if (this.typedSentence === this.questions[this.quizNumber][2]) {
              this.correctNumber++;
              if (this.correctNumber > 9)
              { this.level++;
                this.wpm = this.wpm + 50;
                this.correctNumber = 0;
            }
              this.changeElements();
              this.countTimer();
            }
            return this.correctNumber;
          }
        }
      });
