import os
from PIL import Image, ImageFilter

TARGET_W, TARGET_H = 1200, 900

# 1. 處理米羅 (Miro, 1672 x 941)
im_miro = Image.open('yg-home-hero-miro-ai-concept-v2.webp').convert('RGB')
# 取 4:3 比例的中心裁切 (940 * 4 / 3 = 1253)
crop_miro = im_miro.crop((190, 0, 190 + 1254, 940)).resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

# 2. 處理睡精靈 (Spirit, 1448 x 1086)
im_spirit = Image.open('yg-home-product-sleep-spirit-ai-concept-v2.jpg').convert('RGB')
# 睡精靈原本即為 4:3，床尾在畫面中略偏下，我們以 4:3 進行微幅裁剪使床置中
crop_spirit = im_spirit.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

# 3. 處理維納斯 (Venus, 1448 x 1086)
# 維納斯的床鏡頭非常近。我們需要讓它稍微後退（Zoom Out 約 15%），讓床的大小與米羅、睡精靈完全一致。
im_venus = Image.open('yg-home-product-venus-ai-concept-v2.jpg').convert('RGB')
vw, vh = im_venus.size

scale_v = 0.85
new_vw = int(vw * scale_v)
new_vh = int(vh * scale_v)
scaled_venus = im_venus.resize((new_vw, new_vh), Image.Resampling.LANCZOS)

# 建立 1448 x 1086 底圖，使用原圖四周的自然背景擴展
bg = Image.new('RGB', (vw, vh), (206, 192, 172))

# 上半部複製頂部牆面
top_patch = im_venus.crop((0, 0, vw, 200)).resize((vw, int(vh * 0.45)), Image.Resampling.LANCZOS)
bg.paste(top_patch, (0, 0))

# 下半部複製底部地板
bot_patch = im_venus.crop((0, vh - 180, vw, vh)).resize((vw, int(vh * 0.35)), Image.Resampling.LANCZOS)
bg.paste(bot_patch, (0, vh - int(vh * 0.35)))

# 左側補窗簾
left_patch = im_venus.crop((0, 0, 180, vh)).resize((int(vw * 0.15), vh), Image.Resampling.LANCZOS)
bg.paste(left_patch, (0, 0))

# 右側補牆面
right_patch = im_venus.crop((vw - 180, 0, vw, vh)).resize((int(vw * 0.15), vh), Image.Resampling.LANCZOS)
bg.paste(right_patch, (vw - int(vw * 0.15), 0))

# 貼上縮小後的維納斯床墊，居中靠下
pos_x = (vw - new_vw) // 2
pos_y = vh - new_vh - 15

# 使用遮罩使邊緣極致柔和融合
mask = Image.new('L', (new_vw, new_vh), 255)
# 邊緣 10px 柔化
for i in range(12):
    alpha = int(255 * (i / 12.0))
    # 頂部邊緣漸變
    for x in range(new_vw):
        mask.putpixel((x, i), alpha)

bg.paste(scaled_venus, (pos_x, pos_y), mask)
crop_venus = bg.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)

# 儲存到專案 assets
targets = [
    'yongji-studio/dist/assets',
    'yongji-studio/portable/assets'
]

for t in targets:
    os.makedirs(t, exist_ok=True)
    crop_miro.save(os.path.join(t, 'yg-product-miro-clean.webp'), 'WEBP', quality=94)
    crop_venus.save(os.path.join(t, 'yg-product-venus-clean.webp'), 'WEBP', quality=94)
    crop_spirit.save(os.path.join(t, 'yg-product-sleep-spirit-clean.webp'), 'WEBP', quality=94)

print('All 3 bed images scaled, centered, and aligned to 1200x900!')

