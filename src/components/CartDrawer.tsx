import React from 'react';
import { X, ShoppingBag, Trash2, Copy, Send, ArrowRight, ShieldCheck, Check } from 'lucide-react';
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
  const [copied, setCopied] = React.useState(false);

  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Copy card number to clipboard
  const handleCopyCard = () => {
    navigator.clipboard
      .writeText(BANK_CARD_DETAILS.cardNumberRaw)
      .then(() => {
        setCopied(true);
        onShowToast('شماره کارت ولا لیبل با موفقیت کپی شد');
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
      onShowToast('لطفاً نام و شماره تماس دارای تلگرام خود را وارد نمایید');
      return;
    }

    // Build structured order payload
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
      `آدرس تحویل: ${customerData.address || 'اعلام در چت'}\n\n` +
      `اقلام سفارش:\n${orderItemsSummary}\n\n` +
      `مبلغ کل قابل واریز: ${totalFormatted}\n` +
      `واریز به کارت: ${BANK_CARD_DETAILS.cardNumber} (${BANK_CARD_DETAILS.bankName})\n\n` +
      `لطفاً تصویر فیش واریز را پس از ارسال این پیام ضمیمه نمایید.`;

    // Encode for deep-link payload and direct text
    const encodedPayload = encodeURIComponent(
      `ORDER_${Date.now()}_${customerData.phone.replace(/\D/g, '')}`
    );
    const encodedText = encodeURIComponent(messageText);

    // Deep-link preference: Direct telegram bot or concierge chat
    const telegramUrl = `https://t.me/velalabel?text=${encodedText}`;

    // Open telegram in a new window/app
    window.open(telegramUrl, '_blank');
    onShowToast('در حال انتقال به تلگرام مشاور اختصاصی مزون ولا...');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2A2421]/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Slide-over Container (slides in from left in RTL layout or standard screen side) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full sm:w-[480px] bg-[#FFFFFF] shadow-2xl border-r border-[#E8DFD5] transform transition-transform duration-500 ease-in-out flex flex-col justify-between overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="cart-drawer-panel"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-[#FAF6F0] border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2A2421] text-[#FAF6F0] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#D4C5B9]" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg text-[#2A2421] font-semibold">
                سبد خرید و ثبت سفارش
              </h3>
              <p className="text-[11px] text-[#786C65]">
                {items.length > 0
                  ? `${toPersianDigits(items.length)} قلم کالای دست‌دوز آماده ارسال`
                  : 'سبد شما در حال حاضر خالی است'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E8DFD5] text-[#2A2421] flex items-center justify-center hover:bg-[#E8DFD5] transition-colors"
            aria-label="بستن سبد خرید"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] flex items-center justify-center text-[#A08875]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg text-[#2A2421] font-medium">
                  هنوز قطعه‌ای انتخاب نکرده‌اید
                </h4>
                <p className="text-xs text-[#786C65] max-w-xs leading-relaxed">
                  کالکشن کپسولی ولا با تیراژ محدود شامل کت، پالتو و شومیزهای ابریشمی را مشاهده کنید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-2.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] text-xs font-medium hover:bg-[#140F0D] transition-colors"
              >
                مشاهده محصولات مزون
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#786C65] border-b border-[#E8DFD5]/60 pb-1.5">
                  <span>اقلام سفارش</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#A08875] hover:text-red-700 transition-colors text-[11px]"
                  >
                    خالی کردن سبد
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-20 object-cover rounded-lg border border-[#E8DFD5]"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-[#2A2421] truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-[#786C65] mt-0.5">
                        سایز: {item.size} • رنگ: {item.color}
                      </div>
                      <div className="text-xs font-bold text-[#2A2421] mt-1">
                        {formatTomans(item.product.price * item.quantity)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-20 py-0.5">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#978A7F] hover:text-red-600 transition-colors p-1"
                        title="حذف از سبد"
                        aria-label="حذف آیتم"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 bg-[#FFFFFF] border border-[#E8DFD5] px-2 py-0.5 rounded-full">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#2A2421] font-bold px-1 text-xs hover:text-[#A08875]"
                          aria-label="کاهش تعداد"
                        >
                          -
                        </button>
                        <span className="text-[11px] px-1 font-bold text-[#2A2421]">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#2A2421] font-bold px-1 text-xs hover:text-[#A08875]"
                          aria-label="افزایش تعداد"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Delivery Form */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#A08875] font-semibold tracking-wider font-sans uppercase">
                  <span>اطلاعات تحویل و هماهنگی مزون</span>
                  <span className="text-[10px] text-[#786C65] font-normal">
                    (ذخیره خودکار در مرورگر)
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] text-[#786C65] mb-1 font-medium">
                      نام و نام خانوادگی خریدار *
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: سارا رادمنش"
                      value={customerData.fullName}
                      onChange={(e) =>
                        onCustomerDataChange({
                          ...customerData,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:ring-1 focus:ring-[#2A2421] placeholder:text-[#978A7F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#786C65] mb-1 font-medium">
                      شماره تماس همراه (دارای تلگرام) *
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:ring-1 focus:ring-[#2A2421] text-right placeholder:text-[#978A7F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#786C65] mb-1 font-medium">
                      آدرس دقیق تحویل و کد پستی *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="تهران، خیابان فرشته، ..."
                      value={customerData.address}
                      onChange={(e) =>
                        onCustomerDataChange({
                          ...customerData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] text-[#2A2421] text-xs focus:outline-none focus:ring-1 focus:ring-[#2A2421] placeholder:text-[#978A7F] resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Mezon Bank Card Box */}
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5] space-y-2">
                <div className="flex items-center justify-between text-[#786C65] text-[11px]">
                  <span>اطلاعات واریز کارت به کارت مزون</span>
                  <span className="font-bold text-[#2A2421]">{BANK_CARD_DETAILS.bankName}</span>
                </div>

                <div className="flex items-center justify-between bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E8DFD5]">
                  <span
                    className="font-mono text-xs sm:text-sm font-bold text-[#2A2421] tracking-wider"
                    dir="ltr"
                  >
                    {BANK_CARD_DETAILS.cardNumber}
                  </span>
                  <button
                    onClick={handleCopyCard}
                    className="flex items-center gap-1 text-[10.5px] bg-[#2A2421] text-[#FAF6F0] px-3 py-1 rounded-full hover:bg-[#140F0D] transition-colors active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>کپی کارت</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-[#786C65] leading-relaxed">
                  به نام: {BANK_CARD_DETAILS.accountHolder} • پس از واریز، ارسال فیش در تلگرام انجام
                  می‌گردد.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 border-t border-[#E8DFD5]/80 text-xs text-[#786C65]">
                <div className="flex justify-between">
                  <span>مجموع اقلام ({toPersianDigits(items.length)} عدد):</span>
                  <span className="text-[#2A2421] font-bold">{formatTomans(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>هزینه بسته‌بندی و ارسال بیمه‌شده:</span>
                  <span className="text-emerald-700 font-medium">رایگان (کپسول ویژه)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8DFD5] text-sm text-[#2A2421] font-bold">
                  <span>مبلغ نهایی قابل واریز:</span>
                  <span className="text-base text-[#2A2421]">{formatTomans(totalPrice)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Primary Footer Action */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#FAF6F0] border-t border-[#E8DFD5] space-y-2">
            <button
              onClick={handleSubmitTelegramOrder}
              className="w-full py-3.5 px-6 rounded-full bg-[#2A2421] text-[#FAF6F0] hover:bg-[#140F0D] transition-all flex items-center justify-center gap-2 shadow-lg group active:scale-95"
              id="submit-telegram-order-btn"
            >
              <Send className="w-4 h-4 text-[#D4C5B9] group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                تایید نهایی و ارسال فیش در تلگرام
              </span>
              <span className="text-[#D4C5B9]">✦</span>
            </button>
            <span className="block text-center text-[10px] text-[#786C65]">
              اتصال مستقیم به مشاور اختصاصی مزون (@velalabel) جهت تایید دوخت و ارسال
            </span>
          </div>
        )}
      </div>
    </>
  );
};
