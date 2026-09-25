import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Copy, Send, Check } from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { BANK_CARD_DETAILS, formatTomans, toPersianDigits } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  customerData: CustomerOrderData;
  onCustomerDataChange: (data: CustomerOrderData) => void;
  onShowToast: (message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customerData,
  onCustomerDataChange,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Copy card number
  const handleCopyCard = () => {
    navigator.clipboard
      .writeText(BANK_CARD_DETAILS.cardNumberRaw)
      .then(() => {
        setCopied(true);
        onShowToast('شماره کارت با موفقیت کپی شد');
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        onShowToast(`شماره کارت: ${BANK_CARD_DETAILS.cardNumber}`);
      });
  };

  // Submit Order via Telegram
  const handleSubmitTelegramOrder = () => {
    if (items.length === 0) {
      onShowToast('سبد خرید شما خالی است');
      return;
    }

    if (!customerData.fullName.trim() || !customerData.phone.trim()) {
      onShowToast('لطفاً نام و شماره همراه خود را وارد نمایید');
      return;
    }

    const orderItemsSummary = items
      .map(
        (item) =>
          `• ${item.product.title} (سایز: ${item.size}، رنگ: ${item.color}) - تعداد: ${toPersianDigits(
            item.quantity
          )} - مبلغ: ${formatTomans(item.product.price * item.quantity)}`
      )
      .join('\n');

    const totalFormatted = formatTomans(totalPrice);

    const messageText =
      `✦ ثبت سفارش اختصاصی در مزون VELA LABEL ✦\n\n` +
      `خریدار: ${customerData.fullName}\n` +
      `شماره تماس: ${customerData.phone}\n` +
      `آدرس تحویل: ${customerData.address || 'اعلام در چت'}\n` +
      (customerData.postalCode ? `کد پستی: ${customerData.postalCode}\n` : '') +
      `\nاقلام سفارش:\n${orderItemsSummary}\n\n` +
      `مبلغ کل قابل واریز: ${totalFormatted}\n` +
      `واریز به کارت: ${BANK_CARD_DETAILS.cardNumber} (${BANK_CARD_DETAILS.bankName})\n\n` +
      `لطفاً تصویر فیش واریز را پس از ارسال این پیام ضمیمه فرمایید.`;

    const encodedText = encodeURIComponent(messageText);
    const telegramUrl = `https://t.me/velalabel?text=${encodedText}`;

    window.open(telegramUrl, '_blank');
    onShowToast('در حال انتقال به تلگرام مشاور اختصاصی مزون ولا...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2A2421]/60 backdrop-blur-sm p-0 sm:p-4 md:p-6 flex items-center justify-center animate-fade-in select-none">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Main Checkout Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] sm:rounded-2xl shadow-2xl border border-[#E8DFD5] flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden z-10 animate-pop">
        
        {/* Checkout Header */}
        <div className="px-5 sm:px-8 py-4 bg-[#FAF6F0] border-b border-[#E8DFD5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2A2421] text-[#FAF6F0] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-widest text-[#2A2421] uppercase">VELA LABEL</span>
                <span className="text-[#A08875] text-xs">•</span>
                <h2 className="font-display text-sm sm:text-base font-bold text-[#2A2421]">
                  تسویه‌حساب و ثبت سفارش
                </h2>
              </div>
              <p className="text-[10.5px] text-[#786C65]">
                {items.length > 0
                  ? `${toPersianDigits(items.length)} آیتم دست‌دوز در سبد خرید شما`
                  : 'سبد خرید شما در حال حاضر خالی است'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E8DFD5] text-[#2A2421] flex items-center justify-center hover:bg-[#E8DFD5] transition-colors cursor-pointer skip-delay"
            aria-label="بازگشت به سایت"
            title="بستن پنجره"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-[#2A2421] font-semibold">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-xs text-[#786C65] max-w-xs leading-relaxed">
                  کالکشن کپسولی آتلیه ولا شامل پالتو، کت و شومیزهای ابریشمی را مشاهده کنید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-2.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] text-xs font-medium hover:bg-[#140F0D] transition-colors cursor-pointer"
              >
                مشاهده کالکشن مزون
              </button>
            </div>
          ) : (
            /* 2-Column Desktop Checkout Layout (01-03 on Right, 04 on Left) */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Right Column: Sections 01, 02, 03 (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* 01 — Cart Review */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD5]">
                    <span className="text-sm font-extrabold text-[#2A2421] tracking-wide">
                      ۰۱ — سبد خرید
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#A08875] hover:text-red-700 transition-colors cursor-pointer"
                    >
                      خالی کردن سبد
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] gap-3"
                      >
                        {/* 3:4 Thumbnail */}
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-14 h-18 object-cover rounded-lg border border-[#E8DFD5] shrink-0"
                        />

                        {/* Title and Specs */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-[#2A2421] truncate">
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-[#786C65] mt-0.5">
                            سایز: <strong className="text-[#2A2421] font-bold">{item.size}</strong> • رنگ: {item.color}
                          </div>
                          <div className="text-sm font-extrabold text-[#2A2421] mt-1">
                            {formatTomans(item.product.price * item.quantity)}
                          </div>
                        </div>

                        {/* Stepper & Remove */}
                        <div className="flex flex-col items-end justify-between h-18 py-0.5 shrink-0">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#978A7F] hover:text-red-600 transition-colors p-1 cursor-pointer"
                            title="حذف از سبد"
                            aria-label="حذف آیتم"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1 bg-[#FFFFFF] border border-[#E8DFD5] px-2 py-0.5 rounded-full">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-[#2A2421] font-bold px-1 text-xs hover:text-[#A08875] cursor-pointer"
                              aria-label="کاهش تعداد"
                            >
                              -
                            </button>
                            <span className="text-[11px] px-1 font-bold text-[#2A2421]">
                              {toPersianDigits(item.quantity)}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-[#2A2421] font-bold px-1 text-xs hover:text-[#A08875] cursor-pointer"
                              aria-label="افزایش تعداد"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 02 — Contact & Delivery */}
                <div className="space-y-3 pt-2">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-sm font-extrabold text-[#2A2421] tracking-wide">
                      ۰۲ — اطلاعات تماس و ارسال
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#2A2421] mb-1.5 font-bold">
                          نام و نام خانوادگی <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: مریم کریمی"
                          value={customerData.fullName}
                          onChange={(e) =>
                            onCustomerDataChange({
                              ...customerData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-sm font-medium focus:outline-none focus:border-[#2A2421] placeholder:text-[#978A7F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-[#2A2421] mb-1.5 font-bold">
                          موبایل <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          dir="ltr"
                          placeholder="0912..."
                          value={customerData.phone}
                          onChange={(e) =>
                            onCustomerDataChange({
                              ...customerData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full h-11 px-3.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-sm font-medium focus:outline-none focus:border-[#2A2421] text-right placeholder:text-[#978A7F]"
                        />
                      </div>
                    </div>

                    <div>
                        <label className="block text-xs text-[#2A2421] mb-1.5 font-bold">
                          کد پستی
                        </label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="1987654321"
                        value={customerData.postalCode || ''}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full h-11 px-3.5 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-sm font-medium focus:outline-none focus:border-[#2A2421] text-right placeholder:text-[#978A7F]"
                      />
                    </div>

                    <div>
                        <label className="block text-xs text-[#2A2421] mb-1.5 font-bold">
                          آدرس کامل <span className="text-red-600">*</span>
                        </label>
                      <textarea
                        rows={2}
                        placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، واحد..."
                        value={customerData.address}
                        onChange={(e) =>
                          onCustomerDataChange({
                            ...customerData,
                            address: e.target.value,
                          })
                        }
                        className="w-full p-3 rounded-lg bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-sm font-medium focus:outline-none focus:border-[#2A2421] placeholder:text-[#978A7F] placeholder:font-normal resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* 03 — Payment Information Block */}
                <div className="space-y-3 pt-2">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-sm font-extrabold text-[#2A2421] tracking-wide">
                      ۰۳ — پرداخت
                    </span>
                  </div>

                  {/* Iranian bank card visual */}
                  <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-[#A08875]/30 bg-gradient-to-bl from-[#3d3021] via-[#241c14] to-[#120d0a]">
                    {/* soft decor */}
                    <div className="absolute -left-16 -top-16 w-56 h-56 rounded-full bg-[#A08875]/20 blur-3xl pointer-events-none"></div>
                    <div className="absolute -right-10 -bottom-20 w-56 h-56 rounded-full bg-[#D4C5B9]/10 blur-3xl pointer-events-none"></div>
                    <div aria-hidden dir="ltr" className="absolute -bottom-8 right-2 font-mono text-[92px] leading-none font-bold text-white/[0.05] select-none">
                      5022
                    </div>

                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-bold">{BANK_CARD_DETAILS.bankName}</span>
                      {/* chip */}
                      <span className="w-11 h-8 rounded-md bg-gradient-to-br from-[#E9DCC8] via-[#C9A87A] to-[#8a6f52] shadow-inner relative overflow-hidden shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-px bg-[#5a4a36]/60"></span>
                        <span className="absolute inset-y-0 left-1/2 w-px bg-[#5a4a36]/60"></span>
                      </span>
                    </div>

                    <div dir="ltr" className="relative text-center font-mono text-lg sm:text-[22px] font-bold tracking-[0.14em] my-5 text-[#F5EDE3]">
                      {BANK_CARD_DETAILS.cardNumber.split('-').join('  ')}
                    </div>

                    <div className="relative flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] text-[#D4C5B9]/80">دارنده کارت</div>
                        <div className="text-sm font-bold truncate">{BANK_CARD_DETAILS.accountHolder}</div>
                      </div>
                      <button
                        onClick={handleCopyCard}
                        className="flex items-center gap-1.5 text-xs font-bold bg-[#FAF6F0] text-[#2A2421] dark:bg-[#E9DCC8] dark:text-[#1A1512] px-4 py-2 rounded-full hover:bg-white dark:hover:bg-white transition-colors active:scale-95 cursor-pointer shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی شماره کارت</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#786C65] leading-relaxed">
                    پس از واریز مبلغ، تصویر فیش را در تلگرام ارسال کنید.
                  </p>
                </div>

              </div>

              {/* Left Column: Section 04 - Sticky Final Order Summary (5 cols) */}
              <div className="md:col-span-5 md:sticky md:top-0 space-y-4">
                <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-4 shadow-xs">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-sm font-extrabold text-[#2A2421] tracking-wide">
                      ۰۴ — خلاصه سفارش
                    </span>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-2.5 text-sm font-medium text-[#6B5F58]">
                    <div className="flex justify-between">
                      <span>مجموع ارزش اقلام ({toPersianDigits(items.length)} قلم):</span>
                      <span className="text-[#2A2421] font-semibold">{formatTomans(totalPrice)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>بسته‌بندی نفیس و ارسال بیمه‌شده:</span>
                      <span className="text-emerald-700 font-medium">رایگان (کپسول ویژه)</span>
                    </div>

                    <div className="flex justify-between">
                      <span>مالیات و خدمات مزون:</span>
                      <span className="text-[#2A2421] font-medium">محاسبه‌شده</span>
                    </div>
                  </div>

                  {/* Visually Dominant Final Total */}
                  <div className="pt-3 border-t border-[#E8DFD5] flex items-baseline justify-between gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-[#2A2421]">
                      مبلغ نهایی:
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#2A2421]">
                      {formatTomans(totalPrice)}
                    </span>
                  </div>

                  {/* Primary Dominant CTA */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleSubmitTelegramOrder}
                      className="w-full py-3.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all flex items-center justify-center gap-2 shadow-md group active:scale-95 cursor-pointer skip-delay"
                      id="submit-telegram-order-btn"
                    >
                      <Send className="w-4 h-4 text-[#D4C5B9] group-hover:-translate-y-0.5 transition-transform" />
                      <span className="text-sm sm:text-base font-bold tracking-wide">
                        تایید و ارسال در تلگرام
                      </span>
                    </button>

                    <p className="text-center text-[10px] text-[#786C65] leading-normal px-2">
                      اتصال مستقیم به مشاور اختصاصی مزون (@velalabel) جهت ثبت قطعی دوخت و تایید فیش
                    </p>
                  </div>
                </div>

                {/* Safe & Insured Guarantee */}
                <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E8DFD5] text-[10.5px] text-[#786C65] space-y-1">
                  <div className="font-semibold text-[#2A2421]">ضمانت تحویل و تطابق سایز آتلیه ولا:</div>
                  <div>کلیه سفارش‌ها با کاور محافظ نفیس مزون و بیمه سلامت ارسال می‌گردند.</div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
