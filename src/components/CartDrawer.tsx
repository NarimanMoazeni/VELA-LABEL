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

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCopyCard = () => {
    navigator.clipboard
      .writeText(BANK_CARD_DETAILS.cardNumberRaw)
      .then(() => {
        setCopied(true);
        onShowToast('شماره کارت کپی شد');
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        onShowToast(`شماره کارت: ${BANK_CARD_DETAILS.cardNumber}`);
      });
  };

  const handleSubmitTelegramOrder = () => {
    if (items.length === 0) {
      onShowToast('سبد خرید خالی است');
      return;
    }
    if (!customerData.fullName.trim() || !customerData.phone.trim()) {
      onShowToast('نام و شماره همراه را وارد کنید');
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

    const messageText =
      `✦ سفارش مزون VELA LABEL ✦\n\n` +
      `خریدار: ${customerData.fullName}\n` +
      `تماس: ${customerData.phone}\n` +
      `آدرس: ${customerData.address || 'اعلام در چت'}\n` +
      (customerData.postalCode ? `کد پستی: ${customerData.postalCode}\n` : '') +
      `\nاقلام:\n${orderItemsSummary}\n\n` +
      `مبلغ کل: ${formatTomans(totalPrice)}\n` +
      `واریز به: ${BANK_CARD_DETAILS.cardNumber} (${BANK_CARD_DETAILS.bankName})\n\n` +
      `لطفاً تصویر فیش واریز را ارسال فرمایید.`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://t.me/velalabel?text=${encodedText}`, '_blank');
    onShowToast('در حال انتقال به تلگرام...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2A2421]/50 backdrop-blur-sm flex items-center justify-center animate-fade-in select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white border border-[#E8DFD5] flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden z-10">
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 bg-[#FAF6F0] border-b border-[#E8DFD5] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#A08875]" />
              <h2 className="font-display text-sm sm:text-base font-bold text-[#2A2421]">
                تسویه‌حساب و ثبت سفارش
              </h2>
            </div>
            <p className="text-[10px] text-[#786C65] mt-0.5">
              {items.length > 0
                ? `${toPersianDigits(items.length)} قلم در سبد خرید`
                : 'سبد خرید خالی است'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#786C65] hover:text-[#2A2421] cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#D4C5B9]" />
              <div className="space-y-1">
                <h3 className="font-display text-lg text-[#2A2421] font-semibold">سبد خرید خالی است</h3>
                <p className="text-xs text-[#786C65]">کالکشن آتلیه ولا را مشاهده کنید.</p>
              </div>
              <button onClick={onClose} className="py-2.5 px-6 bg-[#2A2421] text-white text-xs font-medium cursor-pointer">
                مشاهده کالکشن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Steps 01–03 */}
              <div className="md:col-span-7 space-y-6">
                {/* 01 — Cart items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD5]">
                    <span className="text-xs font-bold text-[#2A2421]">۰۱ — اقلام سبد</span>
                    <button onClick={onClearCart} className="text-[11px] text-[#A08875] hover:text-red-600 cursor-pointer">
                      خالی کردن
                    </button>
                  </div>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-[#FAF6F0] border border-[#E8DFD5] gap-3">
                        <img src={item.product.image} alt={item.product.title} className="w-14 h-[72px] object-cover border border-[#E8DFD5] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#2A2421] truncate">{item.product.title}</h4>
                          <div className="text-[11px] text-[#786C65] mt-0.5">
                            سایز: <strong className="text-[#2A2421]">{item.size}</strong> • رنگ: {item.color}
                          </div>
                          <div className="text-xs font-bold text-[#2A2421] mt-1">
                            {formatTomans(item.product.price * item.quantity)}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between h-[72px] py-0.5 shrink-0">
                          <button onClick={() => onRemoveItem(item.id)} className="text-[#978A7F] hover:text-red-600 cursor-pointer p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center gap-1 bg-white border border-[#E8DFD5] px-2 py-0.5">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-[#2A2421] font-bold px-1 text-xs cursor-pointer">-</button>
                            <span className="text-[11px] px-1 font-bold text-[#2A2421]">{toPersianDigits(item.quantity)}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-[#2A2421] font-bold px-1 text-xs cursor-pointer">+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 02 — Contact info */}
                <div className="space-y-3">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-xs font-bold text-[#2A2421]">۰۲ — اطلاعات تماس</span>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#6B5F58] mb-1 font-medium">نام و نام خانوادگی *</label>
                        <input
                          type="text"
                          placeholder="مریم کریمی"
                          value={customerData.fullName}
                          onChange={(e) => onCustomerDataChange({ ...customerData, fullName: e.target.value })}
                          className="w-full h-10 px-3 bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:border-[#2A2421] placeholder:text-[#978A7F]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#6B5F58] mb-1 font-medium">شماره تماس *</label>
                        <input
                          type="tel"
                          dir="ltr"
                          placeholder="0912..."
                          value={customerData.phone}
                          onChange={(e) => onCustomerDataChange({ ...customerData, phone: e.target.value })}
                          className="w-full h-10 px-3 bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:border-[#2A2421] text-right placeholder:text-[#978A7F]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B5F58] mb-1 font-medium">کد پستی</label>
                      <input
                        type="text"
                        dir="ltr"
                        placeholder="1987654321"
                        value={customerData.postalCode || ''}
                        onChange={(e) => onCustomerDataChange({ ...customerData, postalCode: e.target.value })}
                        className="w-full h-10 px-3 bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:border-[#2A2421] text-right placeholder:text-[#978A7F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B5F58] mb-1 font-medium">آدرس تحویل *</label>
                      <textarea
                        rows={2}
                        placeholder="استان، شهر، خیابان..."
                        value={customerData.address}
                        onChange={(e) => onCustomerDataChange({ ...customerData, address: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:border-[#2A2421] placeholder:text-[#978A7F] resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 03 — Payment */}
                <div className="space-y-3">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-xs font-bold text-[#2A2421]">۰۳ — پرداخت کارت‌به‌کارت</span>
                  </div>
                  <div className="p-4 bg-[#FAF6F0] border border-[#E8DFD5] space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6B5F58]">حساب رسمی مزون</span>
                      <span className="font-semibold text-[#2A2421]">{BANK_CARD_DETAILS.bankName}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-2.5 border border-[#E8DFD5]">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#2A2421] tracking-wider" dir="ltr">
                        {BANK_CARD_DETAILS.cardNumber}
                      </span>
                      <button
                        onClick={handleCopyCard}
                        className="flex items-center gap-1 text-[11px] bg-[#2A2421] text-white px-3 py-1 hover:bg-[#1a1715] cursor-pointer"
                      >
                        {copied ? (
                          <><Check className="w-3 h-3 text-emerald-400" /><span>کپی شد</span></>
                        ) : (
                          <><Copy className="w-3 h-3" /><span>کپی</span></>
                        )}
                      </button>
                    </div>
                    <div className="text-[11px] text-[#786C65]">
                      به نام: <strong className="text-[#2A2421]">{BANK_CARD_DETAILS.accountHolder}</strong>
                      <span className="block mt-0.5 text-[10px]">
                        پس از واریز، فیش را در تلگرام ارسال فرمایید.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 04 — Summary sidebar */}
              <div className="md:col-span-5 md:sticky md:top-0 space-y-4">
                <div className="p-5 bg-[#FAF6F0] border border-[#E8DFD5] space-y-4">
                  <div className="pb-2 border-b border-[#E8DFD5]">
                    <span className="text-xs font-bold text-[#2A2421]">۰۴ — خلاصه فاکتور</span>
                  </div>

                  <div className="space-y-2 text-xs text-[#6B5F58]">
                    <div className="flex justify-between">
                      <span>اقلام ({toPersianDigits(items.length)} قلم)</span>
                      <span className="text-[#2A2421] font-semibold">{formatTomans(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ارسال بیمه‌شده</span>
                      <span className="text-emerald-700 font-medium">رایگان</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD5] flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#2A2421]">مبلغ نهایی</span>
                    <span className="text-lg font-bold text-[#2A2421]">{formatTomans(totalPrice)}</span>
                  </div>

                  <button
                    onClick={handleSubmitTelegramOrder}
                    className="w-full py-3.5 px-6 bg-[#2A2421] text-white hover:bg-[#1a1715] flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-telegram-order-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-medium">ثبت سفارش در تلگرام</span>
                  </button>

                  <p className="text-center text-[10px] text-[#786C65] px-2">
                    اتصال به مشاور مزون @velalabel
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
