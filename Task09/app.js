const horseTop = `
   ,
_,,)\.~,,._
(()\`  \`\`)\))),,_
 |     \\ ''((\\)))),,_          ____
 |6\`   |   ''((\\())) "-.____.-"    \`-.-,
 |    .'\\    ''))))'                  \\)))
 |   |   \`.     ''                     ((((
 \\ ,_)     \\/                          |))))
  \`'        |                          (((((
            \\                  |       ))))))
             \`|    |           ,\\     /(((((
              |   / \`-.______.<  \\   |  )))))
              |   |  /         \`. \\  \\  ((((
              |  / \\ |           \`.\\  | (((
              \\  | | |             )| |  ))
`;

const legs = `
               | | | |             || |  
`;

const horse = document.getElementById('horse')
let legCount = 20

const render = () => {
    let output = horseTop;

    for (let i = 0; i < legCount; i++) {
        output += legs;
    }

    horse.textContent = output
}

render();

window.addEventListener('scroll', () => {
    const bottom = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;

    if (bottom >= height - 50) {
        legCount += 5
        render()
    }
})