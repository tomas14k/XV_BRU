import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { eventService } from '../services/eventService.js'

export function QRCard({ id_event }) {
  const [linkToken, setLinkToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const eventUrl = linkToken
    ? `${window.location.origin}/e/${linkToken}`
    : null

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const data = await eventService.getQr({ id_event })
        setLinkToken(data.link_token)
      } catch (error) {
      console.log('error al crear qr:', error.message)
      throw error
        
      } finally {
        setLoading(false)
      }
    }
    fetchQr()
  }, [id_event])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(eventUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-8 animate-pulse">
        <div className="h-48 w-48 rounded-md bg-white/10 mx-auto" />
      </div>
    )
  }

  if (!eventUrl) return null

  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col items-center gap-6">
      <div>
        <h3 className="font-display text-lg font-bold text-white text-center">Código QR</h3>
        <p className="text-sm text-white/40 text-center mt-0.5">Compartilo con tus invitados</p>
      </div>

      {/* QR */}
      <div className="rounded-xl bg-white p-4">
        <QRCodeSVG value={eventUrl} size={180} />
      </div>

      {/* Link + copiar */}
      <div className="w-full flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        <span className="flex-1 truncate text-xs text-white/50">{eventUrl}</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className="size-7 shrink-0 text-white/50 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
      </div>
    </div>
  )
}