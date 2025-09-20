import axios from "axios";

export const handleDownloadFromUrl = async (fileUrl, fileName = "document") => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(fileUrl, {
      headers: { "x-auth-token": token },
      responseType: "arraybuffer",
    });
    let _fileName = `${fileName}.${fileUrl?.split(".")?.at(-1)}`;
    const disposition = res.headers["content-disposition"];
    if (disposition) {
      const match = disposition.match(/filename="?([^";]+)"?/);
      if (match) _fileName = match[1];
    }
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: res.headers["content-type"] })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", _fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Failed to download");
    console.log(err)
  }
};
