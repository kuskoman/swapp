import { exec, ExecOptions } from "child_process";

export const execute = async (cmd: string, cwd?: string) => {
  const options: ExecOptions = {};
  options.cwd = cwd;

  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        console.log(stdout);
        console.error(stderr);
        resolve({ stdout, stderr });
      }
    });
  });
};
