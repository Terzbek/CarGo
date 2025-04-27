import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionList() {
  return (
    <div className="mt-8 md:mt-16 container mx-auto px-4">
      <h1 className="text-[24px] md:text-4xl lg:text-4xl mb-8 md:mb-14 capitalize">
        Часто задаваемые вопросы
      </h1>
      <Accordion type="single" collapsible className="mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Какие документы нужны для аренды?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              Для заключения аренды на нашей платформе вам потребуется:
              <ul className="list-disc list-inside mt-2">
                <li>Удостоверение личности или паспорт</li>
                <li>Водительское удостоверение</li>
                <li>Кошелёк Web3 (например, MetaMask)</li>
              </ul>
              Вся аренда осуществляется через смарт-контракты, что обеспечивает
              прозрачность, безопасность и отсутствие посредников.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Как работает платформа?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              Наша система построена на блокчейне и исключает посредников. Всё
              взаимодействие происходит напрямую между владельцем автомобиля и
              арендатором:
              <ul className="list-disc list-inside mt-2">
                <li>Вы выбираете автомобиль и отправляете заявку</li>
                <li>Условия фиксируются в смарт-контракте</li>
                <li>Оплата и доступ к авто — через Web3</li>
                <li>Всё застраховано и зафиксировано в блокчейне</li>
              </ul>
              Мы не удерживаем комиссии — 100% оплаты получает владелец авто.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Почему стоит выбрать нас?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              Мы — первая в регионе децентрализованная платформа аренды авто, и
              вот что мы предлагаем:
              <ul className="list-disc list-inside mt-2">
                <li>Полная прозрачность благодаря смарт-контрактам</li>
                <li>Без комиссий, без скрытых платежей</li>
                <li>Удобный и безопасный способ оплаты через Web3</li>
                <li>Мгновенное подтверждение аренды</li>
                <li>Поддержка 24/7 и защищённые сделки</li>
                <li>Прямой контакт с владельцем автомобиля</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Как возвращается депозит?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              Депозит блокируется в смарт-контракте и возвращается автоматически
              после завершения аренды, если автомобиль возвращён в надлежащем
              состоянии. В случае повреждений часть суммы может быть удержана
              согласно условиям контракта.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Как происходит передача ключей?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              Передача ключей происходит лично или через умный замок, если
              автомобиль поддерживает удалённый доступ. Все детали оговариваются
              заранее в интерфейсе аренды.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Что делать в случае ДТП?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              В случае ДТП необходимо сразу сообщить в полицию и платформу через
              встроенную форму. Смарт-контракт фиксирует момент окончания
              аренды, а страховка владельца может быть активирована в
              зависимости от условий.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="text-[16px] md:text-[18px]">
            Какие криптовалюты принимаются?
          </AccordionTrigger>
          <AccordionContent className="text-[16px] md:text-[18px]">
            <div className="prose max-w-none">
              В настоящее время мы поддерживаем:
              <ul className="list-disc list-inside mt-2">
                <li>USDT (Ethereum, Polygon, BNB Chain)</li>
                <li>ETH</li>
                <li>MATIC</li>
                <li>BUSD</li>
              </ul>
              В будущем мы планируем добавить поддержку других популярных
              криптовалют.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
