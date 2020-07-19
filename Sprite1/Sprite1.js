import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 0.25,
        y: 0.25
      })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "c" }, this.whenKeyCPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "r" }, this.whenKeyRPressed)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.Width = 22;
    this.stage.vars.Height = 29;
    this.penSize = 2;
    this.penColor = Color.rgb(0, 0, 0);
    yield* this.random();
    while (true) {
      if (this.mouse.down) {
        this.stage.vars.a =
          Math.floor((240 + this.mouse.x) / 16) +
          Math.floor((180 - this.mouse.y) / 16) * this.stage.vars.Height;
        if (this.stage.vars.b == 0) {
          this.stage.vars.b = this.stage.vars.data[this.stage.vars.a - 1] + 2;
        }
        this.stage.vars.data.splice(
          this.stage.vars.a - 1,
          1,
          1 - (this.stage.vars.b - 2)
        );
      } else {
        if (this.stage.vars.calc == 1) {
          yield* this.wait(this.stage.vars.speed / 40);
          yield* this.calculate();
        }
        this.stage.vars.b = 0;
      }
      yield* this.render();
      yield;
    }
  }

  *calculate() {
    this.stage.vars.y = 0;
    for (let i = 0; i < this.stage.vars.Width; i++) {
      this.stage.vars.x = 0;
      for (let i = 0; i < this.stage.vars.Height; i++) {
        yield* this.make(this.stage.vars.x, this.stage.vars.y);
        this.stage.vars.x += 1;
      }
      this.stage.vars.y += 1;
    }
    this.stage.vars.a = 0;
    for (let i = 0; i < this.stage.vars.Width; i++) {
      for (let i = 0; i < this.stage.vars.Height; i++) {
        this.stage.vars.a += 1;
        this.stage.vars.data.splice(
          this.stage.vars.a - 1,
          1,
          Math.floor(this.stage.vars.data[this.stage.vars.a - 1] / 2)
        );
      }
    }
  }

  *render() {
    this.clearPen();
    yield* this.makeGrid();
    this.y = 163;
    this.stage.vars.a = 0;
    for (let i = 0; i < this.stage.vars.Width; i++) {
      this.x = -232;
      for (let i = 0; i < this.stage.vars.Height; i++) {
        this.stage.vars.a += 1;
        if (this.stage.vars.data[this.stage.vars.a - 1] == 1) {
          for (let i = 0; i < 8; i++) {
            this.penDown = true;
            this.x += 16;
            this.penDown = false;
            this.x += -16;
            this.y += 2;
          }
          this.y += -16;
        }
        this.x += 16;
      }
      this.y += -16;
    }
    this.stamp();
  }

  *make(x2, y2) {
    this.stage.vars.a = 0;
    this.stage.vars.b = this.stage.vars.data[
      ((x2 - 1) % this.stage.vars.Height) +
        1 +
        ((y2 - 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      (x2 % this.stage.vars.Height) +
        1 +
        ((y2 - 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      ((x2 + 1) % this.stage.vars.Height) +
        1 +
        ((y2 - 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      ((x2 + -1) % this.stage.vars.Height) +
        1 +
        (y2 % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      ((x2 + 1) % this.stage.vars.Height) +
        1 +
        (y2 % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      ((x2 + -1) % this.stage.vars.Height) +
        1 +
        ((y2 + 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      (x2 % this.stage.vars.Height) +
        1 +
        ((y2 + 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b = this.stage.vars.data[
      ((x2 + 1) % this.stage.vars.Height) +
        1 +
        ((y2 + 1) % this.stage.vars.Width) * this.stage.vars.Height -
        1
    ];
    yield* this.checkFor();
    this.stage.vars.b =
      (x2 % this.stage.vars.Height) +
      1 +
      (y2 % this.stage.vars.Width) * this.stage.vars.Height;
    if (this.stage.vars.data[this.stage.vars.b - 1] == 0) {
      if (this.stage.vars.a == 3) {
        this.stage.vars.data.splice(
          this.stage.vars.b - 1,
          1,
          this.stage.vars.data[this.stage.vars.b - 1] + 2
        );
      }
    } else {
      if (this.stage.vars.a == 2 || this.stage.vars.a == 3) {
        this.stage.vars.data.splice(
          this.stage.vars.b - 1,
          1,
          this.stage.vars.data[this.stage.vars.b - 1] + 2
        );
      }
    }
  }

  *checkFor() {
    if (this.stage.vars.b == 1 || this.stage.vars.b == 3) {
      this.stage.vars.a += 1;
    }
  }

  *whenKeySpacePressed() {
    this.stage.vars.calc = 1 - this.stage.vars.calc;
  }

  *random() {
    for (let i = 0; i < this.stage.vars.Width; i++) {
      for (let i = 0; i < this.stage.vars.Height; i++) {
        this.stage.vars.data.push(this.random(0, 1));
      }
    }
  }

  *whenKeyCPressed() {
    yield* this.clearScreen();
  }

  *clearScreen() {
    this.stage.vars.data = [];
    for (let i = 0; i < this.stage.vars.Width; i++) {
      for (let i = 0; i < this.stage.vars.Height; i++) {
        this.stage.vars.data.push(0);
      }
    }
  }

  *whenKeyRPressed() {
    this.stage.vars.data = [];
    yield* this.random();
  }

  *makeGrid() {
    this.x = -232;
    this.penDown = false;
    this.y = -179;
    this.penDown = true;
    this.y = 179;
    for (let i = 0; i < this.stage.vars.Width; i++) {
      this.penDown = false;
      this.x = -232;
      this.penDown = true;
      for (let i = 0; i < this.stage.vars.Height; i++) {
        this.x += 16;
        this.y += -16;
        this.y += 16;
      }
      this.y += -16;
    }
    this.penDown = false;
    this.x = -232;
    this.penDown = true;
    this.x = 232;
    this.penDown = false;
  }
}
