package com.example.ertheosiswadi.smart_can;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

import java.util.Locale;

public class QRActivity extends AppCompatActivity {

    ImageView imageView;
    Button button;
    EditText editText;
    String EditTextValue ;
    Thread thread ;
    public final static int QRcodeWidth = 750 ;
    Bitmap bitmap ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qr);

        imageView = (ImageView)findViewById(R.id.qr_imageview);

        Button stats_button = (Button) findViewById(R.id.stats_button);
        stats_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startStatsActivity();
            }
        });
        Button points_button = (Button) findViewById(R.id.points_button);
        points_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startPointsActivity();
            }
        });

        Button qr_button = (Button) findViewById(R.id.points_button);
        AssetManager am = this.getApplicationContext().getAssets();

        Typeface typeface = Typeface.createFromAsset(am,
                String.format(Locale.US, "fonts/%s", "Baloo.ttf"));

        stats_button.setTypeface(typeface);
        qr_button.setTypeface(typeface);
        points_button.setTypeface(typeface);

        String to_qr = getIntent().getStringExtra("uuid");



        try {


            bitmap = TextToImageEncode(to_qr);

            imageView.setImageBitmap(bitmap);

        } catch (WriterException e) {
            e.printStackTrace();
        }


    }


    Bitmap TextToImageEncode(String Value) throws WriterException {
        BitMatrix bitMatrix;
        try {
            bitMatrix = new MultiFormatWriter().encode(
                    Value,
                    BarcodeFormat.DATA_MATRIX.QR_CODE,
                    QRcodeWidth, QRcodeWidth, null
            );

        } catch (IllegalArgumentException Illegalargumentexception) {

            return null;
        }
        int bitMatrixWidth = bitMatrix.getWidth();

        int bitMatrixHeight = bitMatrix.getHeight();

        int[] pixels = new int[bitMatrixWidth * bitMatrixHeight];

        for (int y = 0; y < bitMatrixHeight; y++) {
            int offset = y * bitMatrixWidth;

            for (int x = 0; x < bitMatrixWidth; x++) {

                pixels[offset + x] = bitMatrix.get(x, y) ?
                        getResources().getColor(R.color.black):getResources().getColor(R.color.white);
            }
        }
        Bitmap bitmap = Bitmap.createBitmap(bitMatrixWidth, bitMatrixHeight, Bitmap.Config.ARGB_4444);

        bitmap.setPixels(pixels, 0, 750, 0, 0, bitMatrixWidth, bitMatrixHeight);
        return bitmap;
    }
    private void startStatsActivity()
    {
        Intent intent = new Intent(this, StatsActivity.class);
        intent.putExtra("uuid", "NocLYvkHlnRlhP2nWRCNaXqMjZo2");
        startActivity(intent);
    }
    private void startPointsActivity()
    {
        Intent intent = new Intent(this, PointsActivity.class);
        intent.putExtra("uuid", "NocLYvkHlnRlhP2nWRCNaXqMjZo2");
        startActivity(intent);
    }
}
