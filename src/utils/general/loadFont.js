import jsPDF from "jspdf";

export async function loadFont(src, name, style, weight) {
  const fontBytes = await fetch(src).then((res) => res.arrayBuffer());

  var filename = src.split("\\").pop().split("/").pop();
  var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(fontBytes)));

  var callAddFont = function () {
    this.addFileToVFS(filename, base64String);
    this.addFont(filename, name, style, weight);
  };
  jsPDF.API.events.push(["addFonts", callAddFont]);
}
