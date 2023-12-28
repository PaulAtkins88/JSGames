// Step 7. Input class.
export default class GameInput {
  constructor() {
    this.input = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  // The input should have a method that gets the input.
  getInput() {
    return this.input;
  }

  // The input should have a method that handles the key down event.
  /**
   * Handles the key down event.
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        this.input = 'left';
        break;
      case 'ArrowRight':
        this.input = 'right';
        break;
      case 'ArrowDown':
        this.input = 'down';
        break;
      case 'ArrowUp':
        this.input = 'rotate';
        break;
      default:
        break;
    }
  }

  // The input should have a method that handles the key up event.
  /**
   * Handles the key up event.
   * @param {KeyboardEvent} e
   */
  handleKeyUp(e) {
    this.input = null;
  }

  // The input should have a method that handles the touch start event.
  /**
   * Handles the touch start event.
   * @param {TouchEvent} e
   */
  handleTouchStart(e) {
    this.input = e.touches[0].clientX;
  }

  // The input should have a method that handles the touch end event.
  /**
   * Handles the touch end event.
   * @param {TouchEvent} e
   */
  handleTouchEnd(e) {
    this.input = null;
  }

  // The input should have a method that attaches the event listeners to the keyboard and touch screen.
  attachEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  // The input should have a method that detaches the event listeners to the keyboard and touch screen.
  detachEventListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }
}
