export function info(txt: string): void {
  console.info(`%c[INFO] %c${txt}`, 'color: #add8e6', 'color: #fff');
}

export function success(txt: string): void {
  console.info(`%c[SUCCESS] %c${txt}`, 'color: #4BCA81', 'color: #fff');
}