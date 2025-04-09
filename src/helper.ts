const maxLen = 6;

export function genrate() {
  let ans = "";
  const subSet = "3243543dfbhs6t3745367vc8784r643bug9uh";

  for (let i = 0; i < maxLen; i++) {
    ans += subSet[Math.floor(Math.random() * subSet.length)];
  }
  return ans;
}

console.log(genrate());
