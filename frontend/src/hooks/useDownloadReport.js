import { useState } from "react"
import toast from "react-hot-toast"
import API from "../api/api"

/**
 * Returns { downloading, download } where `download(endpoint, filename)` fetches
 * a blob and triggers a browser save-as. Used by the Reports page.
 */
export function useDownloadReport() {
  const [downloading, setDownloading] = useState(false)

  const download = async (endpoint, filename) => {
    try {
      setDownloading(true)
      const response = await API.get(endpoint, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = Object.assign(document.createElement("a"), { href: url, download: filename })
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success(`${filename} downloaded`)
    } catch {
      toast.error(`Failed to download ${filename}`)
    } finally {
      setDownloading(false)
    }
  }

  return { downloading, download }
}
