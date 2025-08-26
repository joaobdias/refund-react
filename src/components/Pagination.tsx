import { Button } from "./Button"
import leftSvg from "../assets/left.svg"
import rightSvg from "../assets/right.svg"

type Prop = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
}

export function Pagination ({current, total, onNext, onPrevious}: Prop){
    return <div className="flex flex-1 justify-center items-center gap-2">
        <Button variant="iconSmall" onClick={onPrevious} disabled={current === 1}>
            <img src={leftSvg} alt="Icone de voltar" />
        </Button>
        <span className="text-sm text-gray-200">
            {current}/{total}
        </span>
        <Button variant="iconSmall" onClick={onNext} disabled={current === total}>
            <img src={rightSvg} alt="Icone de avançar" />
        </Button>
    </div>
}