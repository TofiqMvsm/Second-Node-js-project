const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Couldnt find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Couldnt write the file");
      resolve("Success");
    });
  });
};

const getPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);
    const res1Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro =  superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

      const all = await Promise.all([res1Pro,res2Pro,res3Pro])
      const imgs = all.map(x => x.body.message)
    console.log(imgs);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random image saved a file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "Ready :)";
};
(async () => {
  try {
    const res = await getPic();
    console.log("1 ==== > FIRST");
    console.log(res);
    console.log("2 ==== > SECOND");
  } catch (err) {
    console.log("ERROR");
  }
})();

