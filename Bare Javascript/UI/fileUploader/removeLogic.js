export default function removeImage(files, name) {
  console.log("removeImageLogic");
  files = files.filter(f => f.name !== name);
  return files;
}
