import { Button } from '@/components/ui/button'
import { Zap, CheckCircle2, Clock } from 'lucide-react'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

export function EventActionButton({ state, loading, onStart, onEnd }) {
  if (state === 'finalizado') {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-white/40">
        <Clock className="size-4" />
        <span>Este evento ha finalizado</span>
      </div>
    )
  }

  if (state === 'pendiente') {
    return (
      <ConfirmDialog
        trigger={
          <Button disabled={loading} className="w-full bg-indigo-400 text-black cursor-pointer font-semibold hover:bg-indigo-600/90 gap-2">
            <Zap className="size-4" />
            {loading ? 'Iniciando...' : 'Iniciar transmisión'}
          </Button>
        }
        title="¿Iniciar transmisión?"
        description="Los invitados podrán empezar a subir fotos. Esta acción no se puede deshacer."
        confirmLabel="Iniciar"
        confirmClass="bg-primary text-black hover:bg-primary/90"
        onConfirm={onStart}
      />
    )
  }

  return (
    <ConfirmDialog
      trigger={
        <Button disabled={loading} variant="destructive" className="w-full font-semibold gap-2">
          <CheckCircle2 className="size-4" />
          {loading ? 'Finalizando...' : 'Finalizar evento'}
        </Button>
      }
      title="¿Finalizar el evento?"
      description="Se cerrará la transmisión y los invitados no podrán subir más fotos."
      confirmLabel="Finalizar"
      confirmClass="bg-destructive text-white hover:bg-destructive/90"
      onConfirm={onEnd}
    />
  )
}