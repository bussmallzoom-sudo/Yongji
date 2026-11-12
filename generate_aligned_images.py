import os
from PIL import Image

# 讀取原圖
miro = Image.open('yg-home-hero-miro-ai-concept-v2.webp').convert('RGB')
venus = Image.open('yg-home-product-venus-ai-concept-v2.jpg').convert('RGB')
spirit = Image.open('yg-home-product-sleep-spirit-ai-concept-v2.jpg').convert('RGB')

# 統一輸出尺寸為標準 4:3 比例 (1200 x 900)
OUT_W, OUT_H = 1200, 900

# 1. 米羅 (Miro, 原圖 1672 x 941):
# 原始圖中床墊太小、拍攝視角偏遠。
# 我們對床墊主體進行適當裁切特寫 (Zoom In)，讓床墊放大！
# 床中心約在 x=870, y=500
# 裁切寬度 1340, 高度 940 (比例約 1.425) -> 再拉伸/裁切到 4:3
crop_miro = miro.crop((200, 0, 1540, 941)).resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)

# 2. 睡精靈 (Spirit, 原圖 1448 x 1086):
# 睡精靈原圖是 4:3 (1.333)，床墊比例非常標準適中。
# 直接等比縮放到 1200 x 900 作為基準尺度！
crop_spirit = spirit.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)

# 3. 維納斯 (Venus, 原圖 1448 x 1086):
# 維納斯原圖也是 1448 x 1086，但鏡頭拉得太近、太靠前，整張床巨大！
# 我們需要將維納斯的床墊縮小約 16%~18%，並補充上方米白牆壁與下方原木地板的過渡，
# 讓維納斯的床墊大小與米羅、睡精靈達到視覺 1:1 絕對對齊！
scale_v = 0.82
vw, vh = int(1448 * scale_v), int(1086 * scale_v)
v_scaled = venus.resize((vw, vh), Image.Resampling.LANCZOS)

# 建立 1448 x 1086 畫布
# 上方用維納斯原圖頂部的米色牆壁紋理延伸，下方用地板紋理延伸
bg_venus = Image.new('RGB', (1448, 1086), (206, 192, 172))

# 複製頂部牆壁條 (y=0~150) 向上重複平鋪
top_strip = venus.crop((0, 0, 1448, 80))
for y in range(0, 150, 80):
    bg_venus.paste(top_strip, (0, y))

# 複製底部地板條 (y=1000~1086)
bottom_strip = venus.crop((0, 1000, 1448, 1086))
for y in range(950, 1086, 80):
    bg_venus.paste(bottom_strip, (0, y))

# 將縮小後的維納斯床墊置中靠下貼上
pos_x = (1448 - vw) // 2
pos_y = 1086 - vh - 20 # 底部留出一小截地板
bg_venus.paste(v_scaled, (pos_x, pos_y))

# 羽化邊緣融合：
# 將原圖的邊緣做柔和透明漸層融合
crop_venus = bg_venus.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)

# 儲存校準後的成果圖
out_dir = 'yongji-studio/dist/assets'
os.makedirs(out_dir, exist_ok=True)

crop_miro.save(os.path.join(out_dir, 'yg-product-miro-clean.webp'), 'WEBP', quality=92)
crop_venus.save(os.path.join(out_dir, 'yg-product-venus-clean.webp'), 'WEBP', quality=92)
crop_spirit.save(os.path.join(out_dir, 'yg-product-sleep-spirit-clean.webp'), 'WEBP', quality=92)

# 同步到 portable/assets
out_portable = 'yongji-studio/portable/assets'
os.makedirs(out_portable, exist_ok=True)
crop_miro.save(os.path.join(out_portable, 'yg-product-miro-clean.webp'), 'WEBP', quality=92)
crop_venus.save(os.path.join(out_portable, 'yg-product-venus-clean.webp'), 'WEBP', quality=92)
crop_spirit.save(os.path.join(out_portable, 'yg-product-sleep-spirit-clean.webp'), 'WEBP', quality=92)

print('Successfully generated aligned bed images in dist and portable assets!')

